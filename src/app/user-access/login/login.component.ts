import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentification.service';
import { MatSnackBar } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    username = '';
    password = '';
    labels = {};
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private notification: MatSnackBar,
        private translateService: TranslateService,
    ) { }

    ngOnInit() {
        this.auth.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.translateService.get([
            'badLogin', 'errorDuringLoggin'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    login(e) {
        if (!this.username || !this.password) {
            return false;
        }

        this.auth.login(this.username, this.password).subscribe(token => {
            if (token.accessToken) {
                this.router.navigate([this.returnUrl]);
            } else {
                this.notify(this.labels['badLogin']);
            }
        }, error => {
            this.notify(this.labels['errorDuringLoggin']);
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
