import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import {
  IgoModule,
  LanguageLoader,
  provideLanguageService } from 'igo2';

import { SharedModule } from './shared/shared.module';

export function translateLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

@NgModule({
  imports: [
    SharedModule,
    IgoModule.forRoot()
  ],
  exports: [
    SharedModule,
  ],
  providers: [
    provideLanguageService({
      loader: translateLoader
    }),
  ]
})
export class TestModule { }
