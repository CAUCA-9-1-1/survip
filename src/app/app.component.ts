import { Component, OnInit } from '@angular/core';

import { LanguageService } from 'igo2';
import {WindowRefService} from './shared/services/window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  constructor(
    private language: LanguageService,
    private windowRef: WindowRefService
  ) {
    language.setLanguage('fr');
    windowRef.nativeWindow.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnInit() {
  }

  private onResize() {
    console.log(arguments);
  }
}
