import { BaseModel,ResultModel } from '../http.model';

class TopicSnapshotQueryModel extends BaseModel {
	page_count:number;
	page_no:number;
	data_sign:number;
	tenant_num_id:number;
	update_time:string;
	create_time:string;
	system_name:string;
}

class TopicSnapshot {
	message_cancel_num:number;
	message_no_counsumer_num:number;
	message_counsumer_failed_num:number;
	message_counsumer_success_num:number;
	message_no_confirm_num:number;
	message_confirm_num:number;
	message_num:number;
	retry_time:number;
	message_is_trying_now:number;
	update_time:string;
	create_time:string;
	system_name:string;
	business_remark:string;
	tag:string;
	average_consumer_time:string;
	topic:string;
}

class TopicSnapshotQueryResultModel extends ResultModel {
	total_count:number;
	message_lists:TopicSnapshot[];
}


export {
	TopicSnapshotQueryModel, TopicSnapshot, TopicSnapshotQueryResultModel,
	
}
