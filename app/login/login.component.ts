import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
    providers: [ApiService],
    inputs: ['email', 'password']
})
export class LoginComponent {

    private email: string;
    private password: string;

    constructor(private _router: Router, private _api: ApiService) { }

    submit() {
        this._api.postLogin({ email: this.email, password: this.password }).subscribe(
            data => {
              localStorage.setItem("auth-token", data.token)
              console.log(data);
            },
            err => alert(JSON.parse(err._body).error),
            () => console.log('login success')
        );
    }
}




