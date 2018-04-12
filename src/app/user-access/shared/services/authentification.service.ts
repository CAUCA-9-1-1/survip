import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable()
export class AuthenticationService {
    private storage: any;

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
    }

    private onResponse(result) {
        if (result.data.accessToken) {
            localStorage.setItem('currentToken', result.data.accessToken);
        }

        return result.data;
    }
}