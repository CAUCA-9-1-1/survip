import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    public login(username: string, password: string) {
        return this.http.post(environment.apiUrl + 'Authentification/Logon?user=' + username + '&password=' + password, {
            username: username,
            password: password,
        }).pipe(
            map(response => this.onResponse(response))
        );
    }

    public logout() {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentWebuser');
    }

    private onResponse(response) {
        if (response.data.accessToken) {
            localStorage.setItem('currentToken', response.data.accessToken);
            localStorage.setItem('currentWebuser', response.data.idWebuser);
        }

        return response.data;
    }
}