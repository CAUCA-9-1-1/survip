import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import config from '../../../../assets/config/config.json';


@Injectable()
export class AuthenticationService {
    isLogged = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient
    ) {
        this.isLogged.next(sessionStorage.getItem('accessToken') ? true : false);
        this.status().subscribe(logged => {
            this.isLogged.next(logged);
        }, error => {
            this.isLogged.next(false);
        });
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(config.apiUrl + 'Authentification/Logon?user=' + username + '&password=' + password, {
            username: username,
            password: password,
        }).pipe(
            tap(() => this.isLogged.next(true)),
            map(response => this.onResponse(response)),
        );
    }

    logout() {
        this.isLogged.next(false);

        sessionStorage.clear();
    }

    private status(): Observable<boolean> {
        return this.http.get<boolean>(config.apiUrl + 'Authentification/SessionStatus', {
            headers: {
                'Authorization': sessionStorage.getItem('authorizationType') + ' ' + sessionStorage.getItem('accessToken'),
            }
        });
    }

    private onResponse(response) {
        console.log(response);
        if (response.data.accessToken) {
            sessionStorage.setItem('authorizationType', 'Bearer');
            sessionStorage.setItem('accessToken', response.data.accessToken);
            sessionStorage.setItem('currentWebuser', response.data.idWebuser);
        }

        return response.data;
    }
}