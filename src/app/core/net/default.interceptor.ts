import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { sha1 } from '@core/service/sha1';

import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpErrorResponse,
	HttpSentEvent,
	HttpHeaderResponse,
	HttpProgressEvent,
	HttpResponse,
	HttpUserEvent,
} from '@angular/common/http';
import { Observable, of , throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';

import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

	app_key = "1001";

	constructor(
		private injector: Injector,
		@Inject(DA_SERVICE_TOKEN) private tokenService: TokenService
	) {}

	get msg(): NzMessageService {
		return this.injector.get(NzMessageService);
	}

	private goTo(url: string) {
		setTimeout(() => this.injector.get(Router).navigateByUrl(url));
	}

	private handleData(event: HttpResponse < any > | HttpErrorResponse ): Observable < any > {
		this.injector.get(_HttpClient).end();// 可能会因为 `throw` 导致无法执行 `_HttpClient` 的 `end()` 操作
		switch(event.status) {// 业务处理：一些通用操作
			case 200:
				break;
			case 401: // 未登录状态码
				this.goTo('/passport/login');
				break;
			case 403:
			case 404:
			case 500:
				this.goTo(`/${event.status}`);
				break;
			default:
				if(event instanceof HttpErrorResponse) {
					console.warn(
						'未可知错误，大部分是由于后端不支持CORS或无效配置引起',
						event,
					);
					this.msg.error(event.message);
				}
				break;
		}
		return of(event);
	}


	intercept(
			req: HttpRequest < any > ,
			next: HttpHandler,
		): Observable <
		|
		HttpSentEvent |
		HttpHeaderResponse |
		HttpProgressEvent |
		HttpResponse < any >
		|
		HttpUserEvent < any >
		>
		{
			let url = req.url;// 统一加上服务端前缀
			if(!url.startsWith('https://') && !url.startsWith('http://')) {
				url = environment.SERVER_URL + url;
			}
			const newReq = req.clone({
				url: url,
			});
			return next.handle(newReq).pipe(
				mergeMap((event: any) => {
					if(event instanceof HttpResponse && event.status === 200)// 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
						return this.handleData(event);
					return of(event);// 若一切都正常，则后续操作
				}),
				catchError((err: HttpErrorResponse) => this.handleData(err)),
			);
		}
}