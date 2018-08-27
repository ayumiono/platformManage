import { BaseModel, ResultModel } from '../http.model';

//查询当前数据库下所有的数据表
class TableQueryModel extends BaseModel {
	page_count: number;
	page_no: number;
	table_name_search_key: string;
	db_type: string;
}

class TableModel {
	table_series: number;
	table_biz_name: string;
	table_biz: string;
	table_name: string;
}

class TableQueryResultModel extends ResultModel {
	all_alive_table_listener: TableModel[];
	total: number;
}

//查询当前数据库下的业务名字和业务种类
class BinlogBiz {
	table_topic: string;//topic
	table_biz_name: string;//tag
	table_biz: string;//display label
}

class BinlogBizQueryResultModel extends ResultModel {
	all_table_biz: BinlogBiz[];
}

/**
 * 查询所有的数据库实例
 */
class QueryDataBaseModel extends BaseModel {

	page_count: number;
	page_no: number;

	schema_search_key: string;
	database_ip_search_key: string;

	constructor(page_count ? : number, page_no ? : number, schema_search_key ? : string, database_ip_search_key ? : string) {
		super();
		this.page_count = page_count;
		this.page_no = page_no;
		this.schema_search_key = schema_search_key;
		this.database_ip_search_key = database_ip_search_key;
	}

	public setPage_no(pi: number) {
		this.page_no = pi;
	}
}

class DataBaseQueryResult extends ResultModel {
	all_alive_listener: DataBaseInstance[];
	total: number;
}

class DataBaseListQueryResult extends ResultModel {
	model: DataBaseInstance[];
}

class DataBaseInstance {

	public db_series: number;
	public db_type ? : string;
	public schema_name ? : string;
	public db_remark ? : string;

	constructor(db_series: number, db_type ? : string, schema_name ? : string, db_remark ? : string) {
		this.db_remark = db_remark;
		this.db_series = db_series;
		this.db_type = db_type;
		this.schema_name = schema_name;
	}
}

/**
 * 查询当前数据库下所有的数据表
 */
class TablesInThisDBQueryModel extends BaseModel {
	db_type: string;
}

class TablesInThisDBQueryResultModel extends ResultModel {
	table_list: string[];
}

export {
	QueryDataBaseModel,
	DataBaseInstance,
	DataBaseQueryResult,
	DataBaseListQueryResult,
	TablesInThisDBQueryModel,
	TablesInThisDBQueryResultModel,
	TableQueryModel,
	TableModel,
	TableQueryResultModel,
	BinlogBiz,
	BinlogBizQueryResultModel,

}