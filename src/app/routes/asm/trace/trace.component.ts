import { Component, ViewChild } from '@angular/core';

import { _HttpClient } from '@delon/theme';
import {
	SimpleTableComponent,
	SimpleTableColumn,
	SimpleTableData,
} from '@delon/abc';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
	selector: 'apm-trace-panel',
	templateUrl: './trace.component.html',
})
export class TraceComponent {

	@ViewChild('st') st: SimpleTableComponent;
	traces: any[];
	total: number;
	columns: SimpleTableColumn[] = [{
			title: "traceId",
			index: "transactionId"
		},
		{
			title: "时间",
			index: "startTime"
		},
		{
			title:"标签",
			render:"tagRender"
		}
	];
	traceCache: any = {};

	private gridApi;
	private gridColumnApi;
	private getNodeChildDetails;
	private rowClassRules = {
		"dubbo": function(params) {
			var serviceType = params.data.serviceType;
			return serviceType == 1110;
		},
		"mysql": "data.serviceType == 2100 || data.serviceType == 2101",
		"local_method": "!data.serviceType"
	};
	
	columnDefs = [{
			headerName: "方法",
			valueGetter: this.extractMethod,
			cellRenderer: "agGroupCellRenderer"
		},
		{
			headerName: "入参",
			valueGetter: this.extractArg

		},
		{
			headerName: "开始时间",
			field: "startTime",
			valueFormatter: this.timestampValueFormatter
		},
		{
			headerName: "时间跨度",
			field: "startElapsed"
		},
		{
			headerName: "时间跨度",
			field: "startElapsed",
			cellRenderer:this.progressBarRender
		},
		{
			headerName: "耗时",
			valueGetter: this.extractElapsed
		},
		{
			headerName: '耗时百分比',
			field: 'execPercentage'
		},
		{
			headerName: '服务类别',
			valueGetter: this.extractType
		},
		{
			headerName: '应用',
			field: 'applicationName'
		},
		{
			headerName: '实例ID',
			field: 'agentId'
		},
	];

	/**
	 * 抽取参数
	 */
	extractArg(params) {
		var data = params.data;
		if(data.serviceType == 1110) {
			for(let annotation of data.annotations) {
				if(annotation.key == 90) {
					return annotation.value;
				}
			}
		} else if(data.serviceType == 2100 || data.serviceType == 2101) {
			for(let annotation of data.annotations) {
				if(annotation.key == 21) {
					return annotation.value;
				}
			}
		} else {
			for(let annotation of data.annotations) {
				if(annotation.key == 904) {
					return annotation.value;
				}
			}
		}
	}

	/**
	 * 抽取方法名
	 */
	extractMethod(params) {
		var data = params.data;
		if(data.serviceType == 1110) {
			return data.rpc;
		}
		for(let annotation of data.annotations) {
			if(annotation.key == 12) {
				return annotation.value;
			}
		}
	}

	/**
	 * 抽取节点类型
	 */
	extractType(params) {
		var data = params.data;
		if(data.serviceType == 1110) {
			return "Dubbo Provider";
		}else if(data.serviceType == 9110){
			return "Dubbo Consumer";
		} else if(data.serviceType == 5000) {
			return "本地方法";
		} else if(data.serviceType == 2100 || data.serviceType == 2101) {
			return "MYSQL";
		} else {
			return "未知组件";
		}
	}

	/**
	 * 抽取耗时
	 */
	extractElapsed(params) {
		var data = params.data;
		if(data.spanId) {
			return data.elapsed;
		} else {
			return data.endElapsed;
		}
	}

	/**
	 * 进度条渲染
	 */
	progressBarRender(params) {
		var value = params.value;
		console.log("progressBarRender:"+value);
		if(value === undefined || value === null || value === "" || value === 0) {
			return "";
		}
		var color;
		if(value < 30) {
			color = "#5bc0de";
		} else if(value < 70) {
			color = "#5bc0de";
		} else {
			color = "#5bc0de";
		}
		var html = "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'><span class='percent-complete-bar' style='background-color:#4343C8;width:" + 100 + "%;height:4px;float:left;margin-top:1px;'></span></span>";
		console.log("progressBarRender:"+html);
		return html;
	}

	/**
	 * 时间戳format
	 */
	timestampValueFormatter(params) {
		var d = new Date(params.value);
		var dateStr = d.getFullYear() + "-" +
			(d.getMonth() + 1) + "-" +
			(d.getDate()) + " " +
			(d.getHours()) + ":" +
			(d.getMinutes()) + ":" +
			(d.getSeconds()) + " " +
			(d.getMilliseconds());
		return dateStr;
	}

	/**
	 * 获取trace列表
	 */
	getTracesData() {
		this.http.get('/traces').subscribe(
			(res: any) => {
				this.total = res.total;
				this.traces = res.result;
				this.traces.forEach((row) => {
					//mock tag
					row.dubbo = 1;
					row.err = {};
					row.timeout = 1;
					row.mysql = 1;
					row.txc = {txc_id:11111};
					this.getData(row);
				})
			}
		);
		this.http.get('/treedata').subscribe(
			(res:any) => {
				
			}
		)
	}
	
	/**
	 * 获取span链路数据
	 */
	getData(trace) {
		this.http.get("/trace/" + trace.transactionId).subscribe(
			(res: any) => {
				//清洗数据,并整理trace标签
//				this.sortData(res);
				res.forEach((row) => {
					row.participants = row.tspanEventList;
					delete row.tspanEventList;
				});
				this.traceCache.transactionId = res;
			}
		);
	}
	
	/**
	 * 跳转到txc页面
	 */
	navigateTxc(txc_id){
		this.msg.success("txc tag clicked");
	}
	
	sortData(trace){
		trace.tspanEventList.sort(function(eventa,eventb){
			return eventa.sequence - eventb.sequence;
		});
	}
	
	/**
	 * 数据清洗(可以放在服务端做)
	 * 构造树型结构;txc,err,dubbo,mysql打标签
	 */
	dataCleaning(tspanEventList, participants, tspan) {
		if(!tspan) {
			tspan = tspanEventList[0];
			participants.push(tspan);
			this.dataCleaning(tspanEventList, tspan.participants, tspan);
		}else{
			for(let i of tspanEventList) {
				if(i.parentSequence == tspan.sequence) {
					participants.push(i);
					this.dataCleaning(tspanEventList, i.participants, i);
				}
			}
			return;
		}
 	}

	constructor(
		private http: _HttpClient,
		private msg:NzMessageService,
	) {
		this.getTracesData();
		this.getNodeChildDetails = function getNodeChildDetails(rowItem) {
			if(rowItem.participants) {
				return {
					group: true,
					expanded: true,
					children: rowItem.participants,
					key: rowItem.group
				};
			} else {
				return null;
			}
		};
	}

	onTextboxFilterChanged() {
		var value = "";
		this.gridApi.setQuickFilter(value);
	}

	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
	}
}