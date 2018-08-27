import { Router } from '@angular/router';
import { Component,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '@delon/theme';

import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Component({
  selector: 'passport-lock',
  templateUrl: './lock.component.html',
})
export class UserLockComponent {
  f: FormGroup;

  constructor(
    public settings: SettingsService,
    fb: FormBuilder,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
  ) {
    this.f = fb.group({
      password: [null, Validators.required],
    });
  }
  
  get password() {
		return this.f.controls.password;
	}

  submit() {
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.tokenService.get()['password'] === this.password.value) {
      this.router.navigate(['/offline/deploy_progress']);
    }
  }
}
