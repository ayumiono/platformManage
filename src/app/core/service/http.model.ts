import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ITokenService } from '@delon/auth';

import { sha1 } from '@core/service/sha1';

import { environment } from '@env/environment';

/**
 * 基类
 */
class BaseModel {
}

class ResultModel {
	code:number;
	message:string;
}


class BaseService {
	
	app_key = environment.app_key;
	common_url_prefix = environment.gateway;
	
	constructor(
		private http: _HttpClient,
		private tokenService:ITokenService,
		private router: Router,
		private msg: NzMessageService,
	){}
	
	protected http_get<T extends ResultModel>(methodname:string, model?:BaseModel) : Observable<T>{
		console.log(model);
		return this.http.get<T>(this.common_url_prefix,this.transformApiParams(methodname,model))
		.pipe(
			map((res : T) => {
				console.log(res);
				if(res.code === -20050) {//session过期
					this.goTo("/passport/login");
				}else if(res.code != 0) {
					if(methodname != 'gb.user.by.nickname.password.login') {
						this.msg.error(res.message);
//						return new Observable<T>(function(observer){
//							observer.error(res);
//						})
					}
				}
				return res;
			})
		);
	}
	
	public goTo(url:string){
		setTimeout(() => this.router.navigateByUrl(url));
	}
	
	private transformApiParams(methodname:string, model?:BaseModel): any{
		var base64Params;
		if(model === null || model === undefined) {
			base64Params = this.base64Encoding("{}");
		}else{
			base64Params = this.base64Encoding(model);
		}
		console.log("base64Params:"+base64Params);
		var result : any = {
			app_key: this.app_key,
			method: methodname,
			params: base64Params,
		}
		if(methodname === 'gb.user.by.nickname.password.login') {
			result._allow_anonymous = true;
		}
		if(this.isAuth()) {
			const sid = this.tokenService.get().token;
			console.log("sid:"+sid);
			const timestamp = this.formatTime(new Date());
			const salt = this.tokenService.get()["salt"];
			result.timestamp = timestamp;
			var sign = salt;
			sign += ("method" + methodname);
			sign += ("params" + base64Params);
			sign += ("sid" + sid);
			sign += ("timestamp" + timestamp);
			sign += salt;
			console.log('request sign :' + sign);
			const _sign = sha1(sign);
			console.log('sha1 sign:' + _sign);
			result.sign = _sign;
		}
		console.log('final api request params:'+ JSON.stringify(result));
		return result;
	}
	
	private base64Encoding(data) {
		if (typeof data == 'object') {
			data = JSON.stringify(data);
		}
		return window.btoa(unescape(encodeURIComponent(data)));
	}
	
	public getSid():string {
		return this.tokenService.get().token;
	}
	
	private isAuth(): boolean {
		const model = this.tokenService.get();
		return(model && (typeof model.token === 'string' && model.token.length > 0));
	}
	
	private formatTime(date) {
		if (date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
	
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hour = hour < 10 ? '0' + hour : hour;
			minute = minute < 10 ? '0' + minute : minute;
			second = second < 10 ? '0' + second : second;
	
			return year + month + day + hour + minute + second;
		}
	}
	
	//post
	
	//delete
	
	//request
}
export { BaseModel, ResultModel, BaseService }
