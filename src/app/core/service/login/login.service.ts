import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { _HttpClient } from '@delon/theme';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';

import { LoginModel } from './login.model';
import { BaseService } from '../http.model';

@Injectable()
export class LoginService extends BaseService{
	
	_login = "gb.user.by.nickname.password.login";
	
	constructor(
		http: _HttpClient,
		@Inject(DA_SERVICE_TOKEN) tokenService: TokenService,
		injector: Injector,
		msg: NzMessageService,
	){
		super(http,tokenService,injector.get(Router),msg);
	}

	public login(username: string, password: string) :any{
		return super.http_get<any>(this._login, new LoginModel(username, password));
	}
}