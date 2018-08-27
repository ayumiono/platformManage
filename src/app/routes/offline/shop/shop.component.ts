import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
	PosShopSecretQueryModel,
	PosShopSecret,
	PosShopSecretQueryResultModel,
} from '@core/service/public_api';

@Component({
	selector: 'offline-shop-panel',
	templateUrl: './shop.component.html',
	styles: []
})
export class OfflineShopComponent implements OnInit {

	addForm: FormGroup;
	queryForm: FormGroup;
	@ViewChild('st') st: SimpleTableComponent;

	q: PosShopSecretQueryModel = new PosShopSecretQueryModel();

	data: PosShopSecret[];

	total: number;

	showAddModal = false;

	columns: SimpleTableColumn[] = [{
			title: "门店名",
			index: "shop_name",
			fixed: 'left',
			width: "150px",
		},
		{
			title: "门店编号",
			index: "sub_unit_num_id",
			fixed: 'left',
			width: "150px",
		},
		{
			title: "签名",
			index: "sign",
			width: "300px",
		}, {
			title: 'APP-KEY',
			index: "app_key",
			width: "300px",
		}, {
			title: "密码",
			index: "app_secret",
			width: "400px",
		}, {
			title: "最后修改时间",
			index: "last_update_time",
			fixed: 'right',
			width: "200px",
		}, {
			title: "操作",
			width: "100px",
			fixed: 'right',
			buttons: [{
				text: '删除',
				type: 'del',
				click: (item: PosShopSecret) => {
					this.deletePosShopSecret(item);
					this.getData();
				},
			}],
		}
	];

	constructor(
		private fb: FormBuilder,
		private offlineService: OfflineService,
		private modalSrv: NzModalService,
		private msg: NzMessageService,
	) {
		this.addForm = fb.group({
			add_shop_sub_unit_num_id: [null, [Validators.required, Validators.pattern(/^\d*$/)]],
			add_shop_shop_name: [null, Validators.required]
		});
		this.queryForm = fb.group({
			query_shop_sub_unit_num_id: [null, [Validators.pattern(/^\d*$/)]],
			query_shop_shop_name_serach_key: [null, null]
		});
	}

	get query_shop_sub_unit_num_id() {
		return this.queryForm.controls.query_shop_sub_unit_num_id;
	}

	get query_shop_shop_name_serach_key() {
		return this.queryForm.controls.query_shop_shop_name_serach_key;
	}

	get add_shop_sub_unit_num_id() {
		return this.addForm.controls.add_shop_sub_unit_num_id;
	}
	get add_shop_shop_name() {
		return this.addForm.controls.add_shop_shop_name;
	}

	ngOnInit() {
		this.q.page_no = 1;
		this.q.page_count = 10;
		this.getData();
	}

	getData() {
		if(this.query_shop_sub_unit_num_id.invalid || this.query_shop_shop_name_serach_key.invalid) return;
		this.q.sub_unit_num_id = this.query_shop_sub_unit_num_id.value;
		this.q.shop_name_serach_key = this.query_shop_shop_name_serach_key.value;
		this.offlineService.pos_off_posshopsecret_get(this.q).subscribe(
			(posshopSecrets: PosShopSecretQueryResultModel) => {
				this.data = posshopSecrets.pos_app_secret_model;
				this.total = posshopSecrets.total;
			}
		);
	}

	onChange() {
		this.q.page_no = this.st.pi;
		this.getData();
	}

	deletePosShopSecret(item: PosShopSecret) {
		var deleteModel = new PosShopSecret();
		deleteModel.sub_unit_num_id = item.sub_unit_num_id;
		deleteModel.series = item.series;
		this.offlineService.pos_off_posshopsecret_delete(deleteModel).subscribe(
			(res) => {
				if(res.code == 0) {
					this.msg.success("删除成功");
					this.getData();
				}
			}
		);
	}

	handleOk() {
		this.add_shop_sub_unit_num_id.markAsDirty();
		this.add_shop_sub_unit_num_id.updateValueAndValidity();
		this.add_shop_shop_name.markAsDirty();
		this.add_shop_shop_name.updateValueAndValidity();
		if(this.add_shop_sub_unit_num_id.invalid || this.add_shop_shop_name.invalid) return;
		var addModel = new PosShopSecret();
		addModel.sub_unit_num_id = this.add_shop_sub_unit_num_id.value;
		addModel.shop_name = this.add_shop_shop_name.value;
		this.offlineService.pos_off_posshopsecret_insert(addModel).subscribe({
			next: (res) => {
				if(res.code == 0) {
					this.msg.success("添加成功");
					this.showAddModal = false;
					this.addForm.reset();
					this.getData();
				}
			}
		});
	}

	handleCancel() { //清空数据
		this.addForm.reset();
		this.showAddModal = false;
	}

	add() {
		this.showAddModal = true;
	}
}