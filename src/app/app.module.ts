import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { IgoModule, LanguageLoader, provideLanguageService,
         provideContextServiceOptions } from 'igo2';

import { AppComponent } from './app.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mockdata/in-memory-data.service';

import { SharedModule } from './shared/shared.module';
import { ComponentModule } from './components/components.module';
import { InterventionReportModule } from './intervention-report/intervention-report.module';
import { InterventionSurveyModule } from './intervention-survey/intervention-survey.module';
import { PreventionSurveyModule } from './prevention-survey/prevention-survey.module';
import { ManagementAddressModule } from './management-address/management-address.module';

import { InterventionMapsComponent } from './intervention-maps/intervention-maps.component';
import { InterventionReportComponent } from './intervention-report/intervention-report.component';
import { InterventionSurveyComponent } from './intervention-survey/intervention-survey.component';
import { PreventionSurveyComponent } from './prevention-survey/prevention-survey.component';
import { ManagementAddressComponent } from './management-address/management-address.component';

export function httpLoaderFactory(http: Http) {
  return new LanguageLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    InterventionMapsComponent,
    InterventionReportComponent,
    InterventionSurveyComponent,
    PreventionSurveyComponent,
    ManagementAddressComponent,
  ],
  imports: [
    IgoModule.forRoot(),
    InterventionSectionModule,
    InterventionRoutingModule,
    PreventionSectionModule,
    PreventionRoutingModule,
    SharedModule,
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
