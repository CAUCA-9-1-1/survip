import {Inject, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {throwError as observableThrowError} from 'rxjs';

import {environment} from '../../../environments/environment';


export class RequestService {
    private router: Router;
    protected headers: any;
    protected apiUrl: string;

    constructor(@Inject(Injector) injector: Injector) {
        this.router = injector ? injector.get(Router) : null;

        this.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('currentToken'),
            'Content-Type': 'application/json; charset=UTF-8',
            'languageCode': environment.locale.use,
        };

        this.apiUrl = environment.apiUrl;
    }

    error(error: HttpErrorResponse) {
        switch (error.status) {
            case 0:
            case 401:
                if (this.router) {
                    localStorage.removeItem('currentToken');

                    this.router.navigate(['login']);
                }
                break;
            case 404:
                alert('Not found : ' + error.url);
                break;
        }

        return observableThrowError(error.statusText);
    }
}
