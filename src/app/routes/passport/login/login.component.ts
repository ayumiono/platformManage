import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { catchError } from 'rxjs/operators';

import { LoginService } from '@core/service/public_api';
import { LoginModel } from '@core/service/login/login.model';

@Component({
	selector: 'passport-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
	providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
	form: FormGroup;
	error = '';
	type = 0;

	constructor(
		fb: FormBuilder,
		private router: Router,
		public msg: NzMessageService,
		private modalSrv: NzModalService,
		private settingsService: SettingsService,
		private socialService: SocialService,
		@Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
		@Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
		private startupSrv: StartupService,
		private loginService: LoginService,
	) {
		this.form = fb.group({
			userName: [null, [Validators.required]],
			password: [null, Validators.required],
			mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
			captcha: [null, [Validators.required]],
			remember: [true],
		});
		modalSrv.closeAll();
	}

	get userName() {
		return this.form.controls.userName;
	}
	get password() {
		return this.form.controls.password;
	}
	get mobile() {
		return this.form.controls.mobile;
	}
	get captcha() {
		return this.form.controls.captcha;
	}

	switch(ret: any) {
		this.type = ret.index;
	}

	count = 0;
	interval$: any;

	getCaptcha() {
		this.count = 59;
		this.interval$ = setInterval(() => {
			this.count -= 1;
			if(this.count <= 0) clearInterval(this.interval$);
		}, 1000);
	}

	submit() {
		this.error = '';
		if(this.type === 0) {
			this.userName.markAsDirty();
			this.userName.updateValueAndValidity();
			this.password.markAsDirty();
			this.password.updateValueAndValidity();
			if(this.userName.invalid || this.password.invalid) return;
		} else {
			this.mobile.markAsDirty();
			this.mobile.updateValueAndValidity();
			this.captcha.markAsDirty();
			this.captcha.updateValueAndValidity();
			if(this.mobile.invalid || this.captcha.invalid) return;
		}

		this.loginService.login(this.userName.value, this.password.value)
			.pipe(
				catchError((res: any) => { // 接收其他拦截器后产生的异常消息
					this.error = "系统错误!";
					return res;
				})
			).subscribe((res: any) => {
				if(res.code !== 0) {
					this.error = res.message;
					return;
				}
				this.reuseTabService.clear(); // 清空路由复用信息
				this.tokenService.set({
					token: res.access_token.sid,
					salt: res.access_token.salt,
					password: this.password.value
				});
//				this.settingsService.setUser(this.userName.value);
				// 重新获取 StartupService 内容，若其包括 User 有关的信息的话
				// this.startupSrv.load().then(() => this.router.navigate(['/']));
				// 否则直接跳转
				this.router.navigate(['/']);
			});
	}

	ngOnDestroy(): void {
		if(this.interval$) clearInterval(this.interval$);
	}
}