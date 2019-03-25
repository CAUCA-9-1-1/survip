import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

import {AuthenticationService} from '../shared/services/authentification.service';
import {PermissionService} from '../shared/services/permission.service';
import {ConfigurationService} from '../shared/services/configuration.service';
import * as info from './../../../assets/config/package.json';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [],
})
export class LoginComponent implements OnInit {
    username = '';
    password = '';
    labels = {};
    returnUrl: string;
    version = (<any>info).version;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private permissionService: PermissionService,
        private notification: MatSnackBar,
        private translateService: TranslateService,
        private configService: ConfigurationService,
    ) { }

    ngOnInit() {
        this.auth.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.translateService.get([
            'badLogin', 'errorDuringLogin'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    login() {
        if (!this.username || !this.password) {
            return false;
        }

        this.auth.login(this.username, this.password).subscribe(token => {
            if (token.accessToken) {
                this.loadGeneralConfiguration();
                this.loadUserPermission(token.idWebuser);
            } else {
                this.notify(this.labels['badLogin']);
            }
        }, error => {
            this.notify(this.labels['errorDuringLogin']);
        });

        return false;
    }

    private notify(message: string) {
        this.notification.open( message, '', {
            duration: 5000,
            panelClass: ['error-toasts']
        });
    }

    private loadUserPermission(idWebUser: string) {
        this.permissionService.getUserPermission(idWebUser).subscribe(data => {
            sessionStorage.setItem('currentPermission', JSON.stringify(data));

            this.router.navigate([this.returnUrl]);
        });
    }

    private loadGeneralConfiguration() {
        this.configService.getConfiguration()
            .subscribe(data => {}, error => console.log(error.message));
    }
}
