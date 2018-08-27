import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import {
	SimpleTableComponent,
	SimpleTableColumn,
	SimpleTableData,
} from '@delon/abc';

import {
	OfflineService,
	BinlogService,
	PosBizType,
	PosBizTypeQueryResultModel,
	OfflinePosTable,
	OfflinePosTableQueryModel,
	OfflinePosTableQueryResultModel,
	QueryDataBaseModel,
	DataBaseQueryResult,
	DataBaseListQueryResult,
	DataBaseInstance,
	TablesInThisDBQueryModel,
	TablesInThisDBQueryResultModel,
} from '@core/service/public_api';

@Component({
	selector: 'offline-scheme-panel',
	templateUrl: './scheme.component.html',
	styles: []
})
export class OfflineSchemeComponent implements OnInit {

	@ViewChild('st') st: SimpleTableComponent;

	posBizTypeEnum: PosBizType[];

	q: OfflinePosTableQueryModel = new OfflinePosTableQueryModel();

	data: OfflinePosTable[];

	newOfflinePosTable: OfflinePosTable = new OfflinePosTable();

	total: number;

	dbInstances: DataBaseInstance[];

	tables: string[];

	showAddModal = false;
	selectIsClosed = true;
	expandForm = false;

	columns: SimpleTableColumn[] = [{
			title: "数据库描述",
			index: "db_remark"
		},
		{
			title: "scheme",
			index: "schema_name"
		},
		{
			title: "表名",
			index: "table_name"
		},
		{
			title: "同步类型",
			render: "posBizType"
		},
		{
			title: '操作',
			render:"operation"
		},
	];
	
	mapSqlParamContent(sql_param_id){
		for(let posBizType of this.posBizTypeEnum) {
			if(posBizType.sql_param_id == sql_param_id) {
				return posBizType.sql_param_content;
			}
		}
	}
	
	constructor(
		private offlineService: OfflineService,
		private binlogService: BinlogService,
		private modalSrv: NzModalService,
		private msg: NzMessageService,
	) {}

	ngOnInit() {
		this.q.page_no = 1;
		this.q.page_count = 10;
		zip(
				this.offlineService.pos_off_sqlparamlist_get(),
				this.offlineService.pos_off_allposofflinetable_get(this.q),
				this.binlogService.monitor_dbinstancegroupbydbtype_get()
			)
			.subscribe(
				([posBizTypes, posOfflineTables, dbInstanceList]: [PosBizTypeQueryResultModel, OfflinePosTableQueryResultModel, DataBaseListQueryResult]) => {
					this.posBizTypeEnum = posBizTypes.sql_param_type_list;
					posOfflineTables.all_pos_table_model.forEach((item:any)=>item.original_sql_param_id=item.sql_param_id);
					this.data = posOfflineTables.all_pos_table_model;
					this.total = posOfflineTables.total;
					this.dbInstances = dbInstanceList.model;
				}
			);
	}

	getData() {
		this.offlineService.pos_off_allposofflinetable_get(this.q).subscribe(
			(posOfflineTables: OfflinePosTableQueryResultModel) => {
				posOfflineTables.all_pos_table_model.forEach((item:any)=>item.original_sql_param_id=item.sql_param_id);
				this.data = posOfflineTables.all_pos_table_model;
				this.total = posOfflineTables.total;
			}
		);
	}

	onChange() {
		this.q.page_no = this.st.pi;
		this.getData();
	}

	switchPosBizType(item) {
		if(item.sql_param_id != item.original_sql_param_id) {
			item.changed = true;
		}else{
			item.changed = false;
		}
	}
	
	dropEdit(item:any) {
		item.sql_param_id = item.original_sql_param_id;
		item.edit = false;
		item.changed = false;
	}
	
	saveEdit(item:any) {
		var updateModel = new OfflinePosTable();
		updateModel.series = item.series;
		updateModel.sql_param_id = item.sql_param_id;
		updateModel.table_name = item.table_name;
		this.offlineService.pos_off_posofflinetable_update(updateModel).subscribe(
			(res)=>{
				if(res.code == 0) {
					this.msg.success("保存成功");
					delete item.edit;
					delete item.changed;
				}
			}
		);
	}

	deleteTable(item: OfflinePosTable) {
		var deleteModel = new OfflinePosTable();
		deleteModel.series = item.series;
		this.offlineService.pos_off_posofflinetable_delete(deleteModel).subscribe(
			(res)=>{
				if(res.code == 0) {
					this.msg.success("删除成功");
					this.getData();
				}
			}
		);
	}

	getTablesInThisDB() {
		if(this.selectIsClosed) {
			this.selectIsClosed = false;
			if(this.newOfflinePosTable.schema_name == undefined || this.newOfflinePosTable.schema_name == null) {
				this.msg.error("请先选择数据库!");
				return;
			}
			var queryMode = new TablesInThisDBQueryModel();
			queryMode.db_type = this.newOfflinePosTable.schema_name;
			this.binlogService.monitor_tablelistbydbtype_get(queryMode).subscribe(
				(res: TablesInThisDBQueryResultModel) => {
					this.tables = res.table_list;
				}
			);
		}else{
			this.selectIsClosed = true;
		}
	}

	handleOk() {
		var tmp = new OfflinePosTable();
		tmp.schema_name = this.newOfflinePosTable.schema_name;
		tmp.table_name = this.newOfflinePosTable.table_name[0];
		tmp.sql_param_id = this.newOfflinePosTable.sql_param_id;
		this.offlineService.pos_off_posofflinetable_add(tmp).subscribe({
			next: (res) => {
				if(res.code == 0) {
					this.msg.success("添加成功");
					this.newOfflinePosTable = new OfflinePosTable();
					this.tables = [];
					this.showAddModal = false;
					this.getData();
				}
			}
		});
	}

	handleCancel() {//清空数据
		this.newOfflinePosTable = new OfflinePosTable();
		this.tables = [];
		this.showAddModal = false;
	}

	add() {
		this.showAddModal = true;
	}
}