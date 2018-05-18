import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import localeFr from '@angular/common/locales/fr';
import 'devextreme-intl';
import * as frMessages from 'devextreme/localization/messages/fr.json';
import {locale, loadMessages} from 'devextreme/localization';

import {environment} from '../environments/environment';
import {AuthenticationService} from './user-access/shared/services/authentification.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        AuthenticationService,
    ]
})
export class AppComponent {
    title = 'app';
    isLogged = (localStorage.getItem('currentToken') ? true : false);

    constructor(
        private ngxLanguage: TranslateService,
        private auth: AuthenticationService,
        private router: Router,
    ) {
        environment.locale.use = localStorage.getItem('locale') || environment.locale.use;

        this.auth.status().subscribe(logged => {
            console.log(logged);
            this.isLogged = logged;
        });

        this.setAngular();
        this.setNgxTranslator();
        this.setDevExtreme();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    private setAngular() {
        registerLocaleData(localeFr, 'fr');
    }

    private setDevExtreme() {
        loadMessages(frMessages);
        locale(environment.locale.use);
    }

    private setNgxTranslator() {
        this.ngxLanguage.addLangs(environment.locale.available);
        this.ngxLanguage.setDefaultLang(environment.locale.use);
        this.ngxLanguage.use(environment.locale.use);
    }
}
