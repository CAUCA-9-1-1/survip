import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {locale, loadMessages} from 'devextreme/localization';

import {LanguageService} from 'igo2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  constructor(
    private language: LanguageService,
    private http: Http,
  ) {
    this.http.get(
      '/assets/locale/devextreme/fr.json',
    ).map((response: Response) => {
      loadMessages(response.json())
      locale('fr');
    }).subscribe();

    language.translate.use('fr');
  }

  ngOnInit() {
  }
}
