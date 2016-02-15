import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {HTTP_PROVIDERS, Http, Headers } from 'angular2/http';
import 'rxjs/add/operator/map';


@Component({
  directives: [CORE_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})

@Injectable()

export class ApiService {
    public api_path = 'http://localhost:4000/admin/api/v1';
    private status: number;
    public headers: Headers;
    constructor(private _http: Http) {}


    // ログイン email, password
    postLogin(params: any) {
        console.log("post login");
        return this._callPostApi('Anonymous', '/tokens/sign_in.json', params);
    }

    _callGetApi(type: string, url: string, params?: any) {
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            this._setHeader();
            // For non-protected routes, just use Http
            console.log(this.headers);
            return this._http.get(url, { headers: this.headers }).map(res => res.json());
                // .subscribe(res => {
                //     this.status = res.status;
                //    this .body = res.json();
                // });
        } else if (type === 'Secured') {
            this._setHeader(true);
            return this._http.get(url, { headers: this.headers }).map(res => res.json());
        }
    }
    //     if (type === 'Secured') {
    //       // For protected routes, use AuthHttp
    //       this._authHttp.get(url)
    //         .subscribe(
    //         response => this.result = response.text(),
    //         error => this.result = error.text()
    //       );
    //     }
    // }
    _callPostApi(type: string, url: string, params?: any) {
        params = JSON.stringify(params);
        console.log(params)
        url = this.api_path + url
        if (type === 'Anonymous') {
            this._setHeader();
            return this._http.post(url, params, { headers: this.headers }).map(res => res.json());
        } else if (type === 'Secured') {
            this._setHeader(true);
            return this._http.post(url, params, { headers: this.headers }).map(res => res.json());
        }

    }
    _callDeleteApi(type: string, url: string, params?: any) {
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            this._setHeader();
            return this._http.delete(url, { headers: this.headers }).map(res => res.json());
        } else if (type === 'Secured') {
            this._setHeader(true);
            return this._http.delete(url, { headers: this.headers }).map(res => res.json());
        }
    }

    _urlWithQuery(url: string, params?: any) {
        if (params) {
            Object.keys(params).forEach((value, index) => {
                if (index == 0) {
                    url += "?" + value + "=" + params[value];
                } else {
                    url += "&" + value + "=" + params[value];
                }
            });
        }
        return url;
    }

    _setHeader(auth?: boolean) {
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        this.headers.append('Cache-Control', 'no-chache');
        console.log(this.headers);
    }
}
