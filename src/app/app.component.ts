import {Component, OnInit} from '@angular/core';

import {ConfigService} from 'cause-lib';
import {LanguageService} from 'igo2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  constructor(
    private config: ConfigService,
    private translate: LanguageService
  ) {
    this.config.useLang('fr');
    this.translate.setLanguage('fr');
  }

  ngOnInit() {
  }
}
