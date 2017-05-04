import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { IgoModule, LanguageLoader, provideLanguageService,
         provideContextServiceOptions } from 'igo2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import {
  InterventionSectionModule,
  InterventionRoutingModule,
  PreventionSectionModule,
  PreventionRoutingModule
} from './pages';

export function httpLoaderFactory(http: Http) {
  return new LanguageLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IgoModule.forRoot(),
    InterventionSectionModule,
    InterventionRoutingModule,
    PreventionSectionModule,
    PreventionRoutingModule,
    AppRoutingModule
  ],
  providers: [
    provideContextServiceOptions({
      basePath: './contexts',
      contextListFile: '_contexts.json'
    }),
    provideLanguageService({
      loader: httpLoaderFactory
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
