import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'Authentification/Logon?user=' + username + '&password=' + password, {
            username: username,
            password: password,
        }).pipe(
            tap(() => this.isLogged.next(true)),
            map(response => this.onResponse(response)),
        );
    }

    logout() {
        this.isLogged.next(false);

        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentWebuser');
    }

    private status(): Observable<boolean> {
        return this.http.get<boolean>(environment.apiUrl + 'Authentification/SessionStatus', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('currentToken'),
            }
        });
    }

    private onResponse(response) {
        if (response.data.accessToken) {
            localStorage.setItem('currentToken', response.data.accessToken);
            localStorage.setItem('currentWebuser', response.data.idWebuser);
        }

        return response.data;
    }
}