import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {throwError as observableThrowError} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

import config from '../../../assets/config/config.json';
import {RequestConfig} from '../models/request-config.model';

@Injectable()
export class RequestService {
    private router: Router;
    private notification: MatSnackBar;
    private onRefreshLogin: () => void;

    protected translateService: TranslateService;
    protected http: HttpClient;
    protected headers: any;
    protected apiUrl: string;
    public readOnlyImported: boolean;

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
            'Language-Code': config.locale,
        };
        this.apiUrl = requestConfig.url || config.apiUrl;
        this.readOnlyImported = config.readOnlyImported || false;
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
                // this.refresh();
                console.log('401 in request.service.');
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
}
