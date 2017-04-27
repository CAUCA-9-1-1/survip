import {Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

export class BaseService {
  protected host = './assets/data/';
  private router: Router;

  constructor() {
  }

  protected authorization() {
    const token = localStorage.getItem('currentToken');

    if (token) {
      return new RequestOptions({
        headers: new Headers({
          'Authorization': token
        })
      });
    }
  }

  protected isLogin(result, returnUrl) {
    if (result.error) {
      console.log(result.error);
    }

    if (result.login === false) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: returnUrl
        }
      });
    }
  }
}
