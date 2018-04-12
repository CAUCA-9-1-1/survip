import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class RequestService {
    protected headers: any;
    protected apiUrl: string;

    constructor() {
        this.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('currentToken'),
            'Content-Type': 'application/json; charset=UTF-8',
        };

        this.apiUrl = environment.apiUrl;
    }
}
