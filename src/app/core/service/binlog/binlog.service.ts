import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { _HttpClient } from '@delon/theme';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultModel, BaseService } from '../http.model';
import { QueryDataBaseModel, DataBaseInstance, DataBaseQueryResult,DataBaseListQueryResult,
TablesInThisDBQueryModel,TablesInThisDBQueryResultModel,
TableQueryModel,TableModel,TableQueryResultModel,
BinlogBiz,BinlogBizQueryResultModel,
} from './binlog.model';

@Injectable()
export class BinlogService extends BaseService {
	
	_monitor_dbinstance_get = "monitor.dbinstance.get"; //查询所有的数据库实例
	
	_monitor_dbinstancegroupbydbtype_get = "monitor.dbinstancegroupbydbtype.get"; 
	
	_monitor_dbinstance_delete = "monitor.dbinstance.delete"; //删除所选择的数据库实例
	
	_monitor_tablebydbtype_get = "monitor.tablebydbtype.get"; //查询当前数据库下所有的数据表
	
	_monitor_tablelistbydbtype_get = "monitor.tablelistbydbtype.get"; //获取数据表的列表
	
	_monitor_biztype_get = "monitor.biztype.get"; //查询当前数据库下的业务名字和业务种类
	
	_monitor_table_update = "monitor.table.update"; //修改数据库的同步业务，比如原先a表是同步到门店pos，现在是同步到门店pos+缓存
	
	_monitor_table_delete = "monitor.table.delete"; //删除某一个表的监听
	
	_monitor_table_add = "monitor.table.add"; //增加某一张表的监听
	
	_monitor_kafkaconnect_init = "monitor.kafkaconnect.init"; //将表结构同步到kafka
	
	constructor(
		http: _HttpClient,
		@Inject(DA_SERVICE_TOKEN) tokenService: TokenService,
		injector: Injector,
		msg: NzMessageService,
	){
		super(http,tokenService,injector.get(Router),msg);
	}
	
	public monitor_dbinstance_get(query:QueryDataBaseModel) : Observable<DataBaseQueryResult>{
		var result = super.http_get<DataBaseQueryResult>(this._monitor_dbinstance_get,query);
		return result;
	}
	
	public monitor_dbinstancegroupbydbtype_get() {
		var result = super.http_get<DataBaseListQueryResult>(this._monitor_dbinstancegroupbydbtype_get);
		return result;
	}
	
	public monitor_dbinstance_delete(db_instance:DataBaseInstance) : Observable<any>{
		return super.http_get<any>(this._monitor_dbinstance_delete,db_instance);
	}
	
	public monitor_tablelistbydbtype_get(queryModel:TablesInThisDBQueryModel){
		return super.http_get<TablesInThisDBQueryResultModel>(this._monitor_tablelistbydbtype_get,queryModel);
	}
	
	public monitor_tablebydbtype_get(queryModel:TableQueryModel){
		return super.http_get<TableQueryResultModel>(this._monitor_tablebydbtype_get,queryModel);
	}
	
	public monitor_biztype_get(){
		return super.http_get<BinlogBizQueryResultModel>(this._monitor_biztype_get);
	}
	
	public monitor_table_update(updateModel:TableModel){
		return super.http_get<ResultModel>(this._monitor_table_update,updateModel);
	}
	
	public monitor_table_delete(deleteModel:TableModel){
		return super.http_get<ResultModel>(this._monitor_table_delete,deleteModel);
	}
	
	public monitor_table_add(addModel:TableModel){
		return super.http_get<ResultModel>(this._monitor_table_add,addModel);
	}
	
	public monitor_kafkaconnect_init() : Observable<any>{
		return super.http_get<ResultModel>(this._monitor_kafkaconnect_init);
	}
}
