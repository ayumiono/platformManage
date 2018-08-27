import { BaseModel } from '../http.model';

export class LoginModel extends BaseModel {
	protected nick_name: string;
	protected password: string;
	constructor(nick_name: string, password: string) {
		super();
		this.nick_name = nick_name;
		this.password = password;
	};
}