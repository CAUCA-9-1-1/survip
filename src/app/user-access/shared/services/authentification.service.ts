import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';


@Injectable()
export class AuthenticationService {
    private isLogged = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient
    ) {
        this.isLogged.next(localStorage.getItem('currentToken') ? true : false);
    }

    status(): Observable<boolean> {
        return this.isLogged.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post(environment.apiUrl + 'Authentification/Logon?user=' + username + '&password=' + password, {
            username: username,
            password: password,
        }).pipe(
            map(response => this.onResponse(response))
        );
    }

    logout() {
        this.isLogged.next(false);

        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentWebuser');
    }

    private onResponse(response) {
        if (response.data.accessToken) {
            this.isLogged.next(true);

            localStorage.setItem('currentToken', response.data.accessToken);
            localStorage.setItem('currentWebuser', response.data.idWebuser);
        }

        return response.data;
    }
}