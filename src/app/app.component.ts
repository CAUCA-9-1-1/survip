import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TranslateService } from '@ngx-translate/core';
import 'devextreme-intl';
import * as frMessages from 'devextreme/localization/messages/fr.json';
import { locale, loadMessages } from 'devextreme/localization';

import { environment } from '../environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(private ngxLanguage: TranslateService) {
        environment.locale.use = localStorage.getItem('locale') || environment.locale.use;

        this.setAngular();
        this.setNgxTranslator();
        this.setDevExtreme();
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
