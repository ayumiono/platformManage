import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable,zip,Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {
	SimpleTableComponent,
	SimpleTableColumn,
	SimpleTableData,
} from '@delon/abc';

import {
	BinlogService,
	DataBaseInstance,
TableQueryModel,TableModel,TableQueryResultModel,
BinlogBiz,BinlogBizQueryResultModel,
} from '@core/service/public_api';

@Component({
	selector: 'binlog-panel',
	templateUrl: './binlog.component.html',
})
export class BinlogComponent implements OnInit,OnDestroy {
	
	@ViewChild('st') st: SimpleTableComponent;
	
	q:TableQueryModel = new TableQueryModel();
	data:TableModel[];
	binlogBiz:BinlogBiz[];
	loading = false;
	total:number;
	subscription:Subscription;
	dbInstances: DataBaseInstance[];
	
	newTableModel:TableModel = new TableModel();
	showAddModal = false;
	
	columns: SimpleTableColumn[] = [
		{
			title: "数据表",
			index: "table_name"
		},
		{
			title: "同步业务",
			render: "table_biz"
		},
		{
			title: "消息主题",
			index: "table_biz_name"
		},
		{
			title:'操作',
			render:"operation"
		}
	];

	constructor(
		private http: _HttpClient,
		public msg: NzMessageService,
		private modalSrv: NzModalService,
		private binlogService:BinlogService,
		private activatedRoute:ActivatedRoute,
	) {
		this.subscription = this.activatedRoute.params.subscribe(
			(params:any)=>{
				this.q.db_type = params.db_type;
			}
		);
	}
	
	switchTableBizType(item) {
		if(item.table_biz_name != item.original_table_biz_name) {
			item.changed = true;
		}else{
			item.changed = false;
		}
		for(let biz of this.binlogBiz) {
			if(biz.table_biz_name == item.table_biz_name) {
				item.table_biz = biz.table_biz;
			}
		}
	}
	
	dropEdit(item:any) {
		item.table_biz_name = item.original_table_biz_name;
		item.edit = false;
		item.changed = false;
	}
	
	saveEdit(item:any) {
		var updateModel = JSON.parse(JSON.stringify(item));
		delete updateModel.original_table_biz_name;
		delete updateModel.changed;
		delete updateModel.edit;
		this.binlogService.monitor_table_update(updateModel).subscribe(
			(res)=>{
				if(res.code == 0) {
					this.msg.success("保存成功");
					delete item.edit;
					delete item.changed;
					this.getData();
				}
			}
		);
	}
	
	onDelete(item:TableModel){
		var deleteModel = new TableModel();
		deleteModel.table_series = item.table_series;
		this.binlogService.monitor_table_delete(deleteModel).subscribe(
			(res) => {
				if(res.code == 0) {
					this.msg.success("删除成功");
					this.getData();
				}
			}
		);
	}
	
	onChange(){
		this.q.page_no = this.st.pi;
		this.getData();
	}
	
	ngOnInit() {
		this.q.page_no = 1;
		this.q.page_count = 10;
		zip(
			this.binlogService.monitor_biztype_get(),
			this.binlogService.monitor_tablebydbtype_get(this.q),
			this.binlogService.monitor_dbinstancegroupbydbtype_get()
		).subscribe(
			([binlogBiz,tables,dbInstanceList])=>{
				tables.all_alive_table_listener.forEach((item:any)=>{
					item.original_table_biz_name = item.table_biz_name;
				})
				this.data = tables.all_alive_table_listener;
				this.total = tables.total;
				this.binlogBiz = binlogBiz.all_table_biz;
				this.dbInstances = dbInstanceList.model;
			}
		)
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	
	getData(){
		this.binlogService.monitor_tablebydbtype_get(this.q).subscribe(
			(res:TableQueryResultModel)=>{
				res.all_alive_table_listener.forEach((item:any)=>{
					item.original_table_biz_name = item.table_biz_name;
				})
				this.data = res.all_alive_table_listener;
				this.total = res.total;
			}
		);
	}

	add() {
		this.showAddModal = true;
	}
	
	handleCancel(){
		this.showAddModal = false;
		this.newTableModel = new TableModel();
	}
	
	handleOk(){
		this.binlogService.monitor_table_add(this.newTableModel).subscribe(
			(res)=>{
				if(res.code == 0) {
					this.showAddModal = false;
					this.msg.success("添加成功");
					this.getData();
				}
			}
		);
	}
	
	flushToKafka() {
		this.binlogService.monitor_kafkaconnect_init().subscribe(
			(res)=> {
				if(res.code == 0) {
					this.msg.success("执行成功");
				}
			}
		);
	}
}