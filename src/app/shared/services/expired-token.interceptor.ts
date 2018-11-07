import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';

import {take, filter, catchError, switchMap, finalize} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import {RefreshTokenService} from './refresh-token.service';

@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {

  get isRefreshingToken() {
    return window['isRefreshingToken'] as boolean;
  }

  set isRefreshingToken(newValue: boolean) {
    window['isRefreshingToken'] = newValue;
  }

  get tokenSubject() {
    return window['tokenSubject'] as BehaviorSubject<string>;
  }

  constructor(private injector: Injector) {
    console.log('interceptor');
    window['isRefreshingToken'] = false;
    window['tokenSubject'] = new BehaviorSubject<string>(null);
    // console.log();
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authRequest = req.clone();

    return next.handle(this.setToken(authRequest)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse
          && authRequest.url.indexOf('Authentification/') < 0
          && (<HttpErrorResponse>error).status === 401) {
          console.log('Intercepted request!');
          return this.refreshToken(authRequest, next);
        } else {
          return observableThrowError(error);
        }
      }));
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.getNewAccessToken().pipe(
        switchMap((response) => {
          this.onTokenRefreshed(response);
          if (sessionStorage.getItem('accessToken')) {
            this.tokenSubject.next(sessionStorage.getItem('accessToken'));
            return next.handle(this.setToken(req));
          }
          return this.onLogout();
        }),
        catchError(error => {
          return this.onLogout();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }), );
    } else {

      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.setToken(req));
        }), );
    }
  }

  private getNewAccessToken() {
    const service = this.injector.get(RefreshTokenService);
    return service.getNewToken();
  }

  private onLogout() {
    sessionStorage.clear();
    return observableThrowError('');
  }

  private onTokenRefreshed(response) {
    if (response.accessToken) {
      sessionStorage.setItem('accessToken', response.accessToken);
    }
  }

  private setToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') }});
  }
}
