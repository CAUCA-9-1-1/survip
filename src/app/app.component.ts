import {Component, OnInit} from '@angular/core';
import {locale} from 'devextreme/localization';

import {LanguageService} from 'igo2';
import 'cause-lib/dist/lib/core/extends/devextreme-fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  constructor(
    private language: LanguageService,
  ) {
    locale('fr');
    language.setLanguage('fr');
  }

  ngOnInit() {
  }
}
