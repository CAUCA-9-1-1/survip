import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentification.service';
import { MatSnackBar } from '@angular/material';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        AuthenticationService,
    ]
})
export class LoginComponent implements OnInit {
    username = '';
    password = '';
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private notification: MatSnackBar,
    ) { }

    ngOnInit() {
        this.auth.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(e) {
        if (!this.username || !this.password) {
            return false;
        }

        this.auth.login(this.username, this.password).subscribe(token => {
            if (token.accessToken) {
                this.router.navigate([this.returnUrl]);
            } else {
                this.notify('bad login');
            }
        }, error => {
            this.notify('bad login');
        });

        return false;
    }

    private notify(message: string) {
        this.notification.open( message, '', {
            duration: 5000,
            panelClass: ['error-toasts']
        });
    }
}
