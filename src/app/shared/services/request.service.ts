import {Inject, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {throwError as observableThrowError} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

import config from '../../../assets/config/config.json';
import {RequestConfig} from '../models/request-config.model';


export class RequestService {
    private router: Router;
    private notification: MatSnackBar;
    private translateService: TranslateService;
    private onRefreshLogin: () => void;

    protected http: HttpClient;
    protected headers: any;
    protected apiUrl: string;

    constructor(
        @Inject(Injector) injector: Injector,
        requestConfig?: RequestConfig,
    ) {
        if (!requestConfig) {
            requestConfig = new RequestConfig();
        }

        this.http = injector ? injector.get(HttpClient) : null;
        this.router = injector ? injector.get(Router) : null;
        this.notification = injector ? injector.get(MatSnackBar) : null;
        this.translateService = injector ? injector.get(TranslateService) : null;
        this.onRefreshLogin = requestConfig.onRefreshLogin || (() => {});

        this.headers = {
            'Authorization': sessionStorage.getItem('authorizationType') + ' ' + sessionStorage.getItem('accessToken'),
            'Content-Type': 'application/json; charset=UTF-8',
            'languageCode': config.locale,
        };

        this.apiUrl = requestConfig.url || config.apiUrl;
    }

    get(url: string): Observable<any> {
        return this.http.get(this.apiUrl + url, {
            headers: this.headers
        }).pipe(
            catchError((error: HttpErrorResponse) => this.onError(error))
        );
    }

    post(url: string, body: any): Observable<any> {
        return this.http.post(
            this.apiUrl + url,
            JSON.stringify(body),
            {
                headers: this.headers
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => this.onError(error))
        );
    }

    put(url: string, body: any): Observable<any> {
        return this.http.put<string>(
            this.apiUrl + url,
            JSON.stringify(body),
            {
                headers: this.headers
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => this.onError(error))
        );
    }

    delete(url: string): Observable<any> {
        return this.http.delete(this.apiUrl + url, {
            headers: this.headers
        }).pipe(
            catchError((error: HttpErrorResponse) => this.onError(error))
        );
    }

    private onError(error: HttpErrorResponse) {
        let message = '';
console.log(error);
        switch (error.status) {
            case 0:
                message = this.translateService.instant('requestTimeout');
                break;
            case 400:
                message = this.translateService.instant(error.error);
                break;
            case 401:
                this.onLogout(error);
                break;
            case 404:
                message = this.translateService.instant('requestServer404', {url: error.url});
                break;
            case 500:
                message = this.translateService.instant('requestServer500');
                break;
        }

        if (message) {
            this.notification.open(message, '', {
                duration: 5000,
                panelClass: ['error-toasts']
            });
        }

        return observableThrowError(error.statusText);
    }

    private refresh() {
        this.http.post(this.apiUrl + 'Authentification/Refresh', {
            accessToken: sessionStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        }).subscribe(
            response => this.onRefresh(response),
            error => this.onLogout(error)
        );
    }

    private onLogout(error) {
        if (this.router) {
            sessionStorage.clear();

            this.router.navigate(['login']);
        }
    }

    private onRefresh(response) {
        if (response.accessToken) {
            sessionStorage.setItem('accessToken', response.accessToken);

            this.onRefreshLogin();
        }
    }
}
