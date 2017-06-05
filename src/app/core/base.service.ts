import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

@Injectable()
export class BaseService {
  public static isInLoginProcess = false;
  protected host = environment.apiUrl;
  private storage: any;

  constructor(protected http: Http, protected router?: Router) {
    console.log();
    this.storage = localStorage;
  }

  protected authorization() {
    const token = this.storage.getItem('currentToken');

    if (token) {
      return new RequestOptions({
        headers: new Headers({
          'Authorization': 'Token ' + token
        })
      });
    }
  }

  protected isLogin(result: any, returnUrl?: string, callback?) {
    if (result.error && result.login === false) {
      if (!BaseService.isInLoginProcess) {
        BaseService.isInLoginProcess = true;

        this.login().subscribe((infoToken) => {
          BaseService.isInLoginProcess = false;

          if (infoToken.data.accessToken) {
            this.storage.setItem('currentToken', infoToken.data.accessToken);
          } else if (this.router) {
            this.goToLoginPage(returnUrl);
          }
        });
      }
    }
  }

  protected handleError(error: Response | any) {
    let errorMessage: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);

      errorMessage = error.status + ' - ' + (error.statusText || '') + ' ' + err;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
    return errorMessage;
  }

  private goToLoginPage(returnUrl?: string) {
    let extras = {};

    if (returnUrl) {
      extras = {
        queryParams: {
          returnUrl: returnUrl
        }
      };
    }

    this.router.navigate(['/login'], extras);
  }

  private login() {
    this.storage.removeItem('currentToken');

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
