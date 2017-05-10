import { Component, OnInit } from '@angular/core';

import { LanguageService } from 'igo2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  constructor(private language: LanguageService) {
    language.setLanguage('fr');
  }

  ngOnInit() {
  }

}
