import {Injectable} from '@angular/core';
import {Headers, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

import {HttpService} from './http.service';
import {WindowRefService} from '../shared/services/window-ref.service';

@Injectable()
export class BaseService {
  private static isInLoginProcess = false;
  private storage: any;
  private windowRef = new WindowRefService();
  protected host = environment.apiUrl;

  constructor(protected http: HttpService, protected router?: Router) {
    this.storage = this.windowRef.nativeObject('localStorage');
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
        'auth',
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
