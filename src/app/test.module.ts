import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import {
  LanguageLoader,
  provideLanguageService,
  provideContextServiceOptions } from 'igo2';

import { SharedModule } from './shared/shared.module';

export function translateLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  providers: [
    provideContextServiceOptions({
      basePath: './contexts',
      contextListFile: '_contexts.json'
    }),
    provideLanguageService({
      loader: translateLoader
    }),
  ]
})
export class TestModule { }
