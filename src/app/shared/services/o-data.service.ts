import {Injectable, Injector} from '@angular/core';
import ODataStore from 'devextreme/data/odata/store';

import {ODataConfig} from '../models/o-data-config.model';
import config from '../../../assets/config/config.json';
import {RefreshTokenService} from './refresh-token.service';
import {BehaviorSubject} from 'rxjs/index';
import {Router} from '@angular/router';
import {take, filter, switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ODataService extends ODataStore {
  private refreshService: RefreshTokenService;
  private router: Router;
  private onRefreshLogin: () => void;

  get isRefreshingToken() {
    return window['isRefreshingToken'] as boolean;
  }

  set isRefreshingToken(newValue: boolean) {
    window['isRefreshingToken'] = newValue;
  }

  get tokenSubject() {
    return window['tokenSubject'] as BehaviorSubject<string>;
  }

  public constructor(
    injector: Injector,
    configOData: ODataConfig) {
    super({
      beforeSend: (request) => {
        request.headers['Authorization'] =
          sessionStorage.getItem('authorizationType') + ' ' + sessionStorage.getItem('accessToken');
        request.headers['Language-Code'] = config.locale;
      },
      errorHandler: (error) => this.onError(error),
      url: config.apiUrl + 'odata/' + configOData.url,
      key: configOData.key,
      keyType: configOData.keyType,
      version: 4,
    });

    this.onRefreshLogin = configOData.onRefreshLogin || (() => {});
    this.refreshService = injector.get(RefreshTokenService);
    this.router = injector.get(Router);
  }

  private onError(error) {
    if (error.httpStatus === 401) {
      this.refreshToken();
    }
  }

  private refreshToken() {
    if (this.isRefreshingToken) {
      this.tokenSubject.pipe(
        filter(token => token != null),
        take(1)).subscribe(() => {
        this.onRefreshLogin();
      });
    } else {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      this.refreshService.getNewToken()
        .subscribe(
          response => this.onTokenRefreshed(response),
          error => this.onLogout(error)
        )
        .add(() => {
          this.isRefreshingToken = false;
        });
    }
  }

  private onTokenRefreshed(response) {
    if (response.accessToken) {
      sessionStorage.setItem('accessToken', response.accessToken);
      this.tokenSubject.next(sessionStorage.getItem('accessToken'));
      this.onRefreshLogin();
    }
  }

  private onLogout(error) {
    if (this.router) {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }
}
