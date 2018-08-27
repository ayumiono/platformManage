import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

import { zip } from 'rxjs';
import { map,filter } from 'rxjs/operators';

import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

import {
	MQApiService,
	TopicSnapshotQueryModel, TopicSnapshot, TopicSnapshotQueryResultModel,
} from '@core/service/public_api';

@Component({
  selector: 'mq-topic-snapshot-panel',
  templateUrl: './snapshot.component.html',
  styles: []
})
export class TopicSnapshotComponent implements OnInit {
	
	@ViewChild('st') st: SimpleTableComponent;
	
	q:TopicSnapshotQueryModel = new TopicSnapshotQueryModel();
	data:TopicSnapshot[]
//	= [
//		{
//			topic:'topic',
//			tag:'tag',
//			system_name:'systemName',
//			business_remark:'businessRemark',
//			message_num:10000
//		}
//	]
	;
	total:number;
	
	columns: SimpleTableColumn[] = [
		{
			title: "topic",
			index: "topic",
			fixed: 'left',
			width: "100px"
		},
		{
			title: "tag",
			index: "tag",
			fixed: 'left',
			width: "100px"
		},
		{
			title:"系统名",
			index:"system_name",
			fixed: 'left',
			width: "150px"
		},
		{
			title: "备注",
			index: "business_remark",
			fixed: 'left',
			width: "150px"
		},
		{
			title: "消息总数",
			index: "message_num",
			fixed: 'left',
			width: "100px"
		},
		{
			title: "已确认消息",
			index: "message_confirm_num"
		},
		{
			title: "未确认消息",
			index: "message_no_confirm_num"
		},
		{
			title: "成功消费消息",
			index: "message_counsumer_success_num"
		},
		{
			title: "消费失败消息",
			index: "message_counsumer_failed_num"
		},
		{
			title: "未消费消息",
			index: "message_no_counsumer_num"
		},
		{
			title: "取消消息",
			index: "message_cancel_num"
		},
		{
			title: "正在重试消息",
			index: "message_is_trying_now"
		},
		{
			title: "重试次数",
			index: "retry_time"
		},
		{
			title:"平均消费时长",
			index:"average_consumer_time",
			fixed: 'right',
			width: "150px"
		}
	];
	
	constructor(
		private mqApiService: MQApiService,
		private msg:NzMessageService,
	){}
	
	ngOnInit(){}
	
	getData(){}
	
	onChange(){}
}