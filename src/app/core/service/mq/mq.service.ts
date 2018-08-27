import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { _HttpClient } from '@delon/theme';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';

import { BaseService,ResultModel } from '@core/service/http.model';

import {
	TopicSnapshotQueryModel, TopicSnapshot, TopicSnapshotQueryResultModel,
} from './mq.model';

class MQApiService extends BaseService {
	
	constructor(
		http: _HttpClient,
		@Inject(DA_SERVICE_TOKEN) tokenService: TokenService,
		injector: Injector,
		msg: NzMessageService,
	){
		super(http,tokenService,injector.get(Router),msg);
	}
	
	_gb_cmessage_calculate_mess_count = "gb.cmessage.calculate.mess.count";
	
	public gb_cmessage_calculate_mess_count(queryModel:TopicSnapshotQueryModel) {
		return super.http_get<TopicSnapshotQueryResultModel>(this._gb_cmessage_calculate_mess_count,queryModel);
	}
}

export { MQApiService }
