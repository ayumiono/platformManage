import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tap, map } from 'rxjs/operators';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

import { 
OfflineService,OfflineShopVersionQueryModel,OfflineShopVersionResultModel,OfflineShopVersionModel
,SQLScript,
} from '@core/service/public_api';

@Component({
  selector: 'offline-version-snapshot-panel',
  templateUrl: './version-snapshot.component.html',
  styles: []
})
export class OfflineVersionSnapshotComponent implements OnInit {
	
	@ViewChild('st') st: SimpleTableComponent;
	
	q:OfflineShopVersionQueryModel = new OfflineShopVersionQueryModel(10,1,0,'','','');
	
	data:OfflineShopVersionModel[];
	
	total:number;
	
	showSQLScript:boolean = false;
	
	ddlSQL:string;
	expandForm = false;
	
	returnHome(){
		this.showSQLScript = false;
		this.ddlSQL = null;
	}
	
	jumpToSQLScript(){
		this.showSQLScript = true;
	}
	
	runSQL(){
		let sql = new SQLScript();
		sql.table_column_sql = this.ddlSQL;
		this.offlineService.pos_off_possql_handle(sql).subscribe(
			(res:any) => {
				if(res.code == 0) {
					this.msg.success("执行成功");
				}
			}
		);
	}
	
	columns: SimpleTableColumn[] = [{
			title: "门店",
			index: "shop_remark"
		},
		{
			title: "门店编号",
			index: "sub_unit_num_id"
		},
		{
			title: "数据表",
			index: "table_name"
		},
		{
			title: "服务端版本号",
			index: "max_version"
		},
		{
			title: "门店版本号",
			index: "shop_local_version"
		},
		{
			title: "最后更新日期",
			index: "update_dtme"
		},
	];

  constructor(
		private offlineService: OfflineService,
		private msg: NzMessageService,
	) {}

	ngOnInit() {
		this.getData();
	}

	getData(){
		this.offlineService.pos_off_loalshopmaxversionandserverversion_get(this.q).subscribe(
			(res : OfflineShopVersionResultModel) => {
				this.data = res.modles;
				this.total = res.total;
			}
		);
	}
	
	onChange(){
		this.q.page_count = this.st.pi;
		this.getData();
	}
}
