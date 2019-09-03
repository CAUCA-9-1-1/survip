import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import localeFr from '@angular/common/locales/fr';
import 'devextreme-intl';
import frMessages from 'devextreme/localization/messages/fr.json';
import {locale, loadMessages} from 'devextreme/localization';

import config from '../assets/config/config.json';
import packageInfo from '../assets/config/package.json';
import {AuthenticationService} from './user-access/shared/services/authentification.service';
import {MainMenuComponent} from './shared/components/main-menu/main-menu.component';
import {DxDataGridComponent} from 'devextreme-angular';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        AuthenticationService,
    ]
})
export class AppComponent {
    @ViewChild('menuContainer', {static: false}) menuContainer: ElementRef;
    @ViewChild(MainMenuComponent, {static: false}) menu: MainMenuComponent;

    title = 'app';
    isLogged = false;

    constructor(
        private ngxLanguage: TranslateService,
        private auth: AuthenticationService,
        private router: Router,
    ) {
        config.locale = localStorage.getItem('locale') || config.locale;

        this.auth.isLogged.subscribe(logged => {
            this.isLogged = logged;
        }, error => {
            this.isLogged = false;
            this.logout();
        });

        this.setAngular();
        this.setNgxTranslator();
        this.setDevExtreme();
    }

    logout() {
        this.auth.logout();
        this.menuContainer.nativeElement.style.width = '0';
        this.router.navigate(['/login']);
    }

    showMenu() {
        if (!this.menuContainer.nativeElement.offsetWidth) {
            this.menu.refresh();
            this.menuContainer.nativeElement.style.width = '20%';
        } else {
            this.menuContainer.nativeElement.style.width = '0';
        }
    }

    private setAngular() {
        if (packageInfo.locale.includes('fr')) {
            registerLocaleData(localeFr, 'fr');
        }
    }

    private setDevExtreme() {
        if (packageInfo.locale.includes('fr')) {
            loadMessages(frMessages);
        }

        locale(config.locale);
    }

    private setNgxTranslator() {
        this.ngxLanguage.addLangs(packageInfo.locale);
        this.ngxLanguage.setDefaultLang(config.locale);
        this.ngxLanguage.use(config.locale);
    }
}
