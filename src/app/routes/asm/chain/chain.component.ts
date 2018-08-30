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

@Component({
	selector: 'apm-chain-panel',
	templateUrl: './chain.component.html',
})
export class ChainComponent implements OnInit,OnDestroy {
	
	@ViewChild('st') st: SimpleTableComponent;
	
	data:any;
	
	columns: SimpleTableColumn[] = [
		{
			title: "服务",
			index: "rpc_service"
		},
		{
			title: "调用次数",
			render: "invoke_count"
		},
		{
			title: "调用失败数",
			index: "fail_count"
		},
		{
			title:'状态',
			index:'status'
		},
		{
			title:'实例',
			index:'instance'
		},
		{
			title:'链路跟新时间',
			index:'update_time'
		},
		{
			title:'操作',
			buttons: [
				{
					text: 'trace快照',
					click: (item: any) => {
					},
				},
				{
					text: 'sql分析',
					click: (item: any) => {
					},
				},
				{
					text:'拓扑',
					click:()=>{
						
					}
				}
			],
		}
	];

	constructor(
		private http: _HttpClient,
		public msg: NzMessageService,
		private modalSrv: NzModalService,
		private activatedRoute:ActivatedRoute,
	) {
	}
	
	onChange(){
	}
	
	ngOnInit() {
	}
	
	ngOnDestroy() {
	}
	
	getData(){
	}
	
}