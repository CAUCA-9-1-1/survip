import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';


@Injectable()
export class AuthenticationService {
    isLogged = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient
    ) {
        this.isLogged.next(localStorage.getItem('currentToken') ? true : false);
        this.status().subscribe(logged => {
            this.isLogged.next(logged);
        }, error => {
            this.isLogged.next(false);
        });
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

    private status() {
        return this.http.get(environment.apiUrl + 'Authentification/SessionStatus', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('currentToken'),
            }
        }).pipe(
            map(response => true)
        );
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