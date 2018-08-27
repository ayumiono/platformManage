import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { _HttpClient } from '@delon/theme';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';

import { BaseService,ResultModel } from '@core/service/http.model';

import { OfflineShopVersionQueryModel,OfflineShopVersionResultModel,
DeployProgressQueryModel, DeployProgressQueryResultModel,
DeployProjectQueryModel,DeployProjectQueryResultModel,
PosBizType,PosBizTypeQueryResultModel,
OfflinePosTable,OfflinePosTableQueryModel,OfflinePosTableQueryResultModel,
PosShopSecretQueryModel,PosShopSecret,PosShopSecretQueryResultModel,
PosProjectUpload,
SQLScript,
} from './offline.model';

export class OfflineService extends BaseService {
	
	//版本快照
	_pos_off_loalshopmaxversionandserverversion_get = "pos.off.loalshopmaxversionandserverversion.get";
	
	//项目发布进度
	_pos_off_allprojectuploadstep_get = "pos.off.allprojectuploadstep.get";
	
	//获取项目列表
	_pos_off_allprojectname_get = "pos.off.allprojectname.get";
	
	//查询pos系统离线状态下的所有表格
	_pos_off_allposofflinetable_get = "pos.off.allposofflinetable.get";
	
	//查询pos数据表同步业务类型
	_pos_off_sqlparamlist_get = "pos.off.sqlparamlist.get";
	
	//删除某一张pos离线需要维护的表
	_pos_off_posofflinetable_delete = "pos.off.posofflinetable.delete";
	
	//修改pos离线修改要监听的表结构
	_pos_off_posofflinetable_update = "pos.off.posofflinetable.update";
	
	//增加pos门店需要同步表数据的表
	_pos_off_posofflinetable_add = "pos.off.posofflinetable.add";
	
	//查询不同门店对应的密码
	_pos_off_posshopsecret_get = "pos.off.posshopsecret.get";
	
	//删除密码表
	_pos_off_posshopsecret_delete = "pos.off.posshopsecret.delete";
	
	//增加appsecret
	_pos_off_posshopsecret_insert = "pos.off.posshopsecret.insert";
	
	//发布离线项目
	_pos_off_project_upload = "pos.off.project.upload";
	
	//手动执行sql
	_pos_off_possql_handle = "pos.off.possql.handle";
	
	constructor(
		http: _HttpClient,
		@Inject(DA_SERVICE_TOKEN) tokenService: TokenService,
		injector: Injector,
		msg: NzMessageService,
	){
		super(http,tokenService,injector.get(Router),msg);
	}
	
	
	
	public pos_off_loalshopmaxversionandserverversion_get(queryModel:OfflineShopVersionQueryModel) {
		return super.http_get<OfflineShopVersionResultModel>(this._pos_off_loalshopmaxversionandserverversion_get,queryModel);
	}
	
	public pos_off_allprojectuploadstep_get(queryModel:DeployProgressQueryModel) {
		return super.http_get<DeployProgressQueryResultModel>(this._pos_off_allprojectuploadstep_get,queryModel);
	}
	
	public pos_off_allprojectname_get(queryModel:DeployProjectQueryModel) {
		return super.http_get<DeployProjectQueryResultModel>(this._pos_off_allprojectname_get,queryModel);
	}
	
	public pos_off_allposofflinetable_get(queryModel:OfflinePosTableQueryModel){
		return super.http_get<OfflinePosTableQueryResultModel>(this._pos_off_allposofflinetable_get,queryModel);
	}
	
	public pos_off_sqlparamlist_get() {
		return super.http_get<PosBizTypeQueryResultModel>(this._pos_off_sqlparamlist_get);
	}
	
	public pos_off_posofflinetable_delete(deleteModel:OfflinePosTable){
		return super.http_get<ResultModel>(this._pos_off_posofflinetable_delete, deleteModel); 
	}
	
	
	public pos_off_posofflinetable_update(updateModel:OfflinePosTable) {
		return super.http_get<ResultModel>(this._pos_off_posofflinetable_update,updateModel);
	}
	
	public pos_off_posofflinetable_add(addModel:OfflinePosTable) {
		return super.http_get<ResultModel>(this._pos_off_posofflinetable_add,addModel);
	}
	
	public pos_off_posshopsecret_get(queryModel:PosShopSecretQueryModel) {
		return super.http_get<PosShopSecretQueryResultModel>(this._pos_off_posshopsecret_get,queryModel);
	}
	
	public pos_off_posshopsecret_delete(deleteModel:PosShopSecret) {
		return super.http_get<ResultModel>(this._pos_off_posshopsecret_delete,deleteModel);
	}
	
	public pos_off_posshopsecret_insert(addModel:PosShopSecret) {
		return super.http_get<ResultModel>(this._pos_off_posshopsecret_insert,addModel);
	}
	
	public pos_off_project_upload(deployModel:PosProjectUpload) {
		return super.http_get<ResultModel>(this._pos_off_project_upload,deployModel);
	}
	
	public pos_off_possql_handle(sql:SQLScript) {
		return super.http_get<ResultModel>(this._pos_off_possql_handle,sql);
	}
}