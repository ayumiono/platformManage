import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of , throwError } from 'rxjs';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SimpleTableComponent,SimpleTableColumn,SimpleTableData } from '@delon/abc';

import { BinlogService,DataBaseInstance, QueryDataBaseModel, DataBaseQueryResult } from '@core/service/public_api';

@Component({
	selector: 'binlog-database-panel',
	templateUrl: './database.component.html',
})
export class DatabaseComponent implements OnInit {
	
	@ViewChild('st') st: SimpleTableComponent;
	
	q: QueryDataBaseModel = new QueryDataBaseModel(10,1,'','');
	
	data: DataBaseInstance[];
	
	total:number;
	
	columns: SimpleTableColumn[] = [
		{
			title: "数据库描述",
			index: "db_remark"
		},
		{
			title: "shema名",
			index: "schema_name"
		},
		{
			title: "数据库类型",
			index: "db_type"
		},
		{
			title: '操作',
			buttons: [
				{
					text: '查询表',
					click: (item: DataBaseInstance) => {
						this.router.navigate(['/binlog/table/in',item.schema_name]);
					},
				},
				{
					text: '删除',
					type: 'del',
					click: (item: DataBaseInstance) => {
						this.deleteDatabase(item);
					},
				},
			],
		},
	];

	constructor(
		public msg: NzMessageService,
		private modalSrv: NzModalService,
		private binlogService: BinlogService,
		private router:Router,
	) {}

	ngOnInit() {
		this.getData();
	}
	
	onChange(){
		this.q.setPage_no(this.st.pi);
		this.getData();
	}
	
	deleteDatabase(item:DataBaseInstance){
		const onlyseriesNeed: DataBaseInstance = new DataBaseInstance(item.db_series);
		this.binlogService.monitor_dbinstance_delete(onlyseriesNeed).subscribe(
			(res:any) => {
				if(res.code == 0) {
					this.msg.success('删除成功');
					this.getData();
				}else{
					this.msg.error(res.message);
				}
			}
		);
	}
	
	getData() {
		this.binlogService.monitor_dbinstance_get(this.q).subscribe(
			(res : DataBaseQueryResult) => {
				this.data = res.all_alive_listener;
				this.total = res.total;
			}
		);
	}
}