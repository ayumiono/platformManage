import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'gb-call-flow',
	templateUrl: './callflow.component.html',
	styleUrls: [
		'./callFlow.css',
	]
})
export class CallFlowComponent {
	
//	@ViewChild('myGrid') container:ElementRef;
//	
//	data:any[] = [];
//	
//	ngOnInit() {
//		this.prepareData();
//		// initialize the model
//	  	dataView = new Slick.Data.DataView({ inlineFilters: true });
//	  	dataView.beginUpdate();
//	  	dataView.setItems(data);
//	  	dataView.setFilter(myFilter);
//	  	dataView.endUpdate();
//		// initialize the grid
//		var grid = new Slick.Grid(this.container.nativeElement, dataView, columns, options);
//	}
//	
//	//mock data for test
//	prepareData(){
//		// prepare the data
//	  	for (var i = 0; i < 1000; i++) {
//		    var d = (data[i] = {});
//		    var parent;
//		
//		    if (Math.random() > 0.8 && i > 0) {
//		      indent++;
//		      parents.push(i - 1);
//		    } else if (Math.random() < 0.3 && indent > 0) {
//		      indent--;
//		      parents.pop();
//		    } 
//			
//		    if (parents.length > 0) {
//		      parent = parents[parents.length - 1];
//		    } else {
//		      parent = null;
//		    }
//		
//		    d["id"] = "id_" + i;
//		    d["indent"] = indent;
//		    d["parent"] = parent;
//		    d["title"] = "Task " + i;
//		    d["duration"] = "5 days";
//		    d["percentComplete"] = Math.round(Math.random() * 100);
//		    d["start"] = "01/01/2009";
//		    d["finish"] = "01/05/2009";
//		    d["effortDriven"] = (i % 5 == 0);
//		}
//	}
//	
//	options = {
//		editable: false,
//		enableAddRow: false,
//		enableCellNavigation: true,
//		asyncEditorLoading: false
//	};
////	columns = [
////      {id: "method", name: "Method", field: "method", width: 400, formatter: treeFormatter},
////      {id: "argument", name: "Argument", field: "argument", width: 300, formatter: argumentFormatter},
////      {id: "exec-time", name: "Start Time", field: "execTime", width: 90, formatter: execTimeFormatter},
////      {id: "gap-ms", name: "Gap(ms)", field: "gapMs", width: 70, cssClass: "right-align"},
////      {id: "time-ms", name: "Exec(ms)", field: "timeMs", width: 70, cssClass: "right-align"},
////      {id: "time-per", name: "Exec(%)", field: "timePer", width: 100, formatter: progressBarFormatter},
////      {id: "exec-milli", name: "Self(ms)", field: "execMilli", width: 75, cssClass: "right-align"},
////      {id: "class", name: "Class", field: "class", width: 120},
////      {id: "api-type", name: "API", field: "apiType", width: 90},
////      {id: "agent", name: "Agent", field: "agent", width: 130},
////      {id: "application-name", name: "Application", field: "applicationName", width: 150}
////  ];
//
//	columns = [
//	  {id: "title", name: "Title", field: "title", width: 220, cssClass: "cell-title", formatter: TaskNameFormatter, editor: Slick.Editors.Text, validator: requiredFieldValidator},
//	  {id: "duration", name: "Duration", field: "duration", editor: Slick.Editors.Text},
//	  {id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Slick.Formatters.PercentCompleteBar, editor: Slick.Editors.PercentComplete},
//	  {id: "start", name: "Start", field: "start", minWidth: 60, editor: Slick.Editors.Date},
//	  {id: "finish", name: "Finish", field: "finish", minWidth: 60, editor: Slick.Editors.Date},
//	  {id: "effort-driven", name: "Effort Driven", width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cannotTriggerInsert: true}
//	];
//  
//  private progressBarFormatter(row, cell, value, columnDef, dataContext) {
//      if ( angular.isUndefined( value ) || value === null || value === "" || value === 0) {
//          return "";
//      }
//      var color;
//      if (value < 30) {
//          color = "#5bc0de";
//      } else if (value < 70) {
//          color = "#5bc0de";
//      } else {
//          color = "#5bc0de";
//      }
//      //return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
//      //<span class="percent-complete-bar" style="background-color:red;width:40%;height:2px;float:left;margin-top:2px"></span>
//      return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'><span class='percent-complete-bar' style='background-color:#4343C8;width:" + dataContext.execPer + "%;height:4px;float:left;margin-top:1px;'></span></span>";
//  };
//  
//  private argumentFormatter(row, cell, value, columnDef, dataContext) {
//      var html = [];
//      html.push('<div class="dcf-popover" data-container=".grid-canvas" data-toggle="popover" data-trigger="manual" data-placement="right" data-content="'+ encodeURIComponent(value) +'">');
//      html.push( getAuthorizeView( dataContext.isAuthorized, value ) );
//      html.push('</div>');
//      return html.join('');
//  };
//  
//  private execTimeFormatter(row, cell, value, columnDef, dataContext) {
//  	if ( angular.isUndefined( value ) || value === null ) {
//  		return "";
//		} else {
//			return CommonUtilService.formatDate(value, "HH:mm:ss SSS");
//		}
//  };
//  
//  private treeFormatter(row, cell, value, columnDef, dataContext) {
//      var html = [];
//
//      // value = value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
//      var item = dataView.getItemById(dataContext.id);
//      lastAgent = item.agent ? item.agent : lastAgent;
//
//      var leftBarColor = getColorByString(lastAgent),
//          idx = dataView.getIdxById(dataContext.id),
//          divClass = 'dcf-popover';
//
//      if (item.hasException) {
//          divClass += ' has-exception';
//      } else if (!item.isMethod) {
//          divClass += ' not-method';
//      }
//
//      html.push('<div class="'+divClass+'" data-container=".grid-canvas" data-toggle="popover" data-trigger="manual" data-placement="right" data-content="'+ removeTag( value ) +'">');
//      html.push("<div style='position:absolute;top:0;left:0;bottom:0;width:5px;background-color:"+ leftBarColor +"'></div>");
//      html.push("<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>");
//
//      if (window.callStacks[idx + 1] && window.callStacks[idx + 1].indent > window.callStacks[idx].indent) {
//          if (dataContext._collapsed) {
//              html.push(" <span class='toggle expand'></span>&nbsp;");
//          } else {
//              html.push(" <span class='toggle collapse'></span>&nbsp;");
//          }
//      } else {
//          html.push(" <span class='toggle'></span>&nbsp;");
//      }
//
//      if (item.hasException) {
//          html.push('<span class="glyphicon glyphicon-fire"></span>&nbsp;');
//      } else if (!item.isMethod) {
//      	if( item.method === "SQL" ) {
//      		html.push('<button type="button" class="btn btn-default btn-xs btn-success sql" style="padding:0px 2px 0px 2px"><span class="glyphicon glyphicon-eye-open sql"></span></button>&nbsp;');
//      	} else {
//      		html.push('<span class="glyphicon glyphicon-info-sign"></span>&nbsp;');
//      	}
//          
//      } else {
//      	var itemMethodType = parseInt( item.methodType );
//      	switch( itemMethodType ) {
//      	case 100:
//      			html.push('<i class="xi-shipping"></i>&nbsp;');
//      			break;
//      	case 200:
//      			html.push('<span class="glyphicon glyphicon-transfer"></span>&nbsp;');
//      			break;
//      	case 900:
//      			html.push('<i class="xi-info-triangle" style="color:#FF6600"></i>&nbsp;');
//      			break;
//      	}
//      }
//
//      html.push( getAuthorizeView( dataContext.isAuthorized, value ) );
//      html.push('</div>');
//
//      return html.join('');
//  };
//  
//  //example 
//  private requiredFieldValidator(value) {
//	  	if (value == null || value == undefined || !value.length) {
//	    	return {valid: false, msg: "This is a required field"};
//	  	} else {
//	    	return {valid: true, msg: null};
//	  	}
//	}
//
//
//	private TaskNameFormatter(row, cell, value, columnDef, dataContext) {
//	  	value = value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
//	  	var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
//	  	var idx = dataView.getIdxById(dataContext.id);
//	  	if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
//		    if (dataContext._collapsed) {
//		      	return spacer + " <span class='toggle expand'></span>&nbsp;" + value;
//		    } else {
//		      	return spacer + " <span class='toggle collapse'></span>&nbsp;" + value;
//		    }
//	  	} else {
//	    	return spacer + " <span class='toggle'></span>&nbsp;" + value;
//	  	}
//	};
//	
//	private myFilter(item) {
//	  	if (item["percentComplete"] < percentCompleteThreshold) {
//	    	return false;
//	  	}
//	  	if (searchString != "" && item["title"].indexOf(searchString) == -1) {
//	    	return false;
//	  	}
//	  	if (item.parent != null) {
//	    	var parent = data[item.parent];
//	    	while (parent) {
//		      	if (parent._collapsed || (parent["percentComplete"] < percentCompleteThreshold) || (searchString != "" && parent["title"].indexOf(searchString) == -1)) {
//		        	return false;
//		      	}
//	      		parent = data[parent.parent];
//	    	}
//	  	}
//	  return true;
//	}
}