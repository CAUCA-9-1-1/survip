import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

@Injectable()
export class BaseService {
  protected host = 'http://cadevsprevention1.ad.cauca.ca/api/';

  constructor(protected http: Http, protected router?: Router) {
  }

  protected authorization() {
    const token = localStorage.getItem('currentToken');

    if (token) {
      return new RequestOptions({
        headers: new Headers({
          'Authorization': 'Token ' + token
        })
      });
    }
  }

  protected isLogin(result, returnUrl) {
    if (result.error && !result.login) {
      this.login().subscribe((infoToken) => {
        if (infoToken.data.accessToken) {
          localStorage.setItem('currentToken', infoToken.data.accessToken);
        } else if (this.router) {
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: returnUrl
            }
          });
        }
      });
    }
  }

  protected handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);

      // errMsg = ${error.status} + ' - ' + ${error.statusText || ''} + ' ' + ${err};
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(error);
    return Promise.reject(errMsg);
  }

  private login() {
    const username = 'admin';
    const password = 'cauca2017';

    if (username && password) {
      return this.http.put(
        this.host + 'auth',
        JSON.stringify({
          username: 'admin',
          password: 'cauca2017'
        }),
        this.secretkey()
      ).map((response: Response) => {
        return response.json();
      });
    }

    return this.http.put(
      this.host + 'auth',
      '',
      this.secretkey()
    ).map((response: Response) => {
      return response.json();
    });
  }

  private secretkey() {
    const key = '5d98e9644cc8e3b1aea67e0c23c76b4c7ee3fb91546402fad725a15e';

    if (key) {
      return new RequestOptions({
        headers: new Headers({
          'Authorization': 'Key ' + key
        })
      });
    }
  }
}
