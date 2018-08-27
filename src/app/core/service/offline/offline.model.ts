import { BaseModel,ResultModel } from '@core/service/http.model';


//版本快照

class OfflineShopVersionQueryModel extends BaseModel{
	constructor(
		public page_count:number,
		public page_no:number,
		public version_change:number,
		public shop_name_search_key:string,
		public sub_unit_num_id:string,
		public table_name_search_key:string,
	){
		super();
	}
}

class OfflineShopVersionResultModel extends ResultModel {
	modles:OfflineShopVersionModel[];
	total:number;
}

class OfflineShopVersionModel {
	private sub_unit_num_id:number;
	private max_version:number;
	private shop_local_version:number;
	private shop_remark:string;
	private table_name:string;
	private update_dtme:string;
}


//门店项目同步进度

class DeployProgressQueryModel extends BaseModel {
	dataSign:number;
	tenantNumId:number;
	page_count:number;
	page_no:number;
	success: 'Y'|'N';
	project_name:string;
}

class DeployProgressModel {
	success: 'Y'|'N';
	resoult_remark:string;
	project_name:string;
	shop_name:string;
}

class DeployProgressQueryResultModel extends ResultModel {
	success_total:number;
	timeout_total:number;
	failed_total:number;
	models:DeployProgressModel[]
}


//获取项目列表
class DeployProjectQueryModel extends BaseModel {
	dataSign:number;
	tenantNumId:number;
}

class DeployProjectModel {
	project_name:string;
}

class DeployProjectQueryResultModel extends ResultModel {
	models:DeployProjectModel[];
}


//pos数据表同步业务类型
class PosBizType {
	sql_param_id:number;
	sql_param_content:string;
}

class PosBizTypeQueryResultModel extends ResultModel {
	sql_param_type_list:PosBizType[];
}

//离线pos监听的表
class OfflinePosTable {
	sql_param_id:number;
	series:number;
	global_update:string;
	global_sql_parm:string;
	single_sql:string;
	schema_name:string;
	db_remark:string;
	table_name:string;
}

class OfflinePosTableQueryModel extends BaseModel {
	page_no:number;
	page_count:number;
	table_name_search_key:string;
	database_ip_search_key:string;
	schema_search_key:string;
}

class OfflinePosTableQueryResultModel extends ResultModel {
	total:number;
	all_pos_table_model:OfflinePosTable[];
}

//查询门店密码
class PosShopSecretQueryModel extends BaseModel {
	page_no:number;
	page_count:number;
	sub_unit_num_id:number;
	shop_name_serach_key:string;
}

class PosShopSecret {
	shop_name:string;
	sub_unit_num_id:number;
	series:number;
	sign:string;
	app_secret:string;
	app_key:string;
	last_update_time:string;
}

class PosShopSecretQueryResultModel extends ResultModel {
	pos_app_secret_model:PosShopSecret[]
	total:number;
}

//发布离线项目
class PosProjectUpload extends BaseModel {
	url:string;
	project_name;
}

//手动执行sql
class SQLScript extends BaseModel {
	table_column_sql:string;
}

export { OfflineShopVersionQueryModel,OfflineShopVersionResultModel,OfflineShopVersionModel,
DeployProgressQueryModel, DeployProgressModel, DeployProgressQueryResultModel,
DeployProjectQueryModel,DeployProjectModel,DeployProjectQueryResultModel,
PosBizType,PosBizTypeQueryResultModel,
OfflinePosTable,OfflinePosTableQueryModel,OfflinePosTableQueryResultModel,
PosShopSecretQueryModel,PosShopSecret,PosShopSecretQueryResultModel,
PosProjectUpload,
SQLScript,
}
