import { Component } from '@angular/core';
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
    useLanguage = 'fr';

    constructor(private ngxLanguage: TranslateService) {
        this.useLanguage = localStorage.getItem('locale') || environment.locale.default;

        this.setNgxTranslator();
        this.setDevExtreme();
    }

    private setDevExtreme() {
        loadMessages(frMessages);
        locale(this.useLanguage);
    }

    private setNgxTranslator() {
        this.ngxLanguage.addLangs(environment.locale.available);
        this.ngxLanguage.setDefaultLang(this.useLanguage);
        this.ngxLanguage.use(this.useLanguage);
    }
}
