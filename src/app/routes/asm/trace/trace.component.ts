import { Component, ViewChild } from '@angular/core';

import { _HttpClient } from '@delon/theme';
import {
	SimpleTableComponent,
	SimpleTableColumn,
	SimpleTableData,
} from '@delon/abc';

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
			render: "startTime"
		},
		{
			title: "异常",
			index: "err"
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

	extractType(params) {
		var data = params.data;
		if(data.serviceType == 1110) {
			return "DUBBO Prov";
		} else if(data.serviceType == 5000) {
			return "本地方法";
		} else if(data.serviceType == 2100 || data.serviceType == 2101) {
			return "MYSQL";
		} else {
			return "未知组件";
		}
	}

	extractElapsed(params) {
		var data = params.data;
		if(data.spanId) {
			return data.elapsed;
		} else {
			return data.endElapsed;
		}
	}

	private columnDefs = [{
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
			headerName: '类',
			field: 'className'
		},
		{
			headerName: '类别',
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

	getTracesData() {
		this.http.get('/traces').subscribe(
			(res: any) => {
				this.total = res.total;
				this.traces = res.result;
				this.traces.forEach((res) => {
					this.getRowData(res.transactionId);
				})
			}
		);
	}

	constructor(private http: _HttpClient) {
		this.getTracesData();
		this.getNodeChildDetails = function getNodeChildDetails(rowItem) {
			if(rowItem.participants) {
				return {
					group: true,
					expanded: rowItem.group === "Group C",
					children: rowItem.participants,
					key: rowItem.group
				};
			} else {
				return null;
			}
		};
	}

	getRowData(transactionId) {
		if(!this.traceCache.transactionId) {
			this.getData(transactionId);
		}
		return this.traceCache.transactionId;
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

	getData(transactionId) {
		console.log("getData invoked");
		this.http.get("/trace/" + transactionId).subscribe(
			(res: any) => {
				res.forEach((row) => {
					row.participants = row.tspanEventList;
					delete row.tspanEventList;
				});
				this.traceCache.transactionId = res;
			}
		);
	}
}