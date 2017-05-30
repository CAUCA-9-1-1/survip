import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './mockdata/in-memory-data.service';

import {SharedModule} from './shared/shared.module';
import {InterventionMapsModule} from './intervention-maps/intervention-maps.module';
import {InterventionReportModule} from './intervention-report/intervention-report.module';
import {InterventionSurveyModule} from './intervention-survey/intervention-survey.module';
import {PreventionSurveyModule} from './prevention-survey/prevention-survey.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementAccessModule} from './management-access/management-access.module';

import {InterventionMapsComponent} from './intervention-maps/intervention-maps.component';
import {InterventionReportComponent} from './intervention-report/intervention-report.component';
import {InterventionSurveyComponent} from './intervention-survey/intervention-survey.component';
import {PreventionSurveyComponent} from './prevention-survey/prevention-survey.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {InterventionBuildingComponent} from './intervention-building/intervention-building.component';
import {InterventionBuildingModule} from './intervention-building/intervention-building.module';
import {InterventionListModule} from './intervention-list/intervention-list.module';
import {InterventionListComponent} from './intervention-list/intervention-list.component';
import {PreventionReportModule} from './prevention-report/prevention-report.module';
import {PreventionReportComponent} from './prevention-report/prevention-report.component';
import {ManagementAccessComponent} from './management-access/management-access.component';


@NgModule({
  declarations: [
    AppComponent,
    InterventionMapsComponent,
    InterventionReportComponent,
    InterventionSurveyComponent,
    InterventionBuildingComponent,
    PreventionSurveyComponent,
    PreventionReportComponent,
    ManagementAddressComponent,
    ManagementAccessComponent,
    InterventionListComponent,
  ],
  imports: [
    SharedModule,

    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true
    }),

    InterventionMapsModule,
    InterventionReportModule,
    InterventionSurveyModule,
    InterventionBuildingModule,
    InterventionListModule,
    PreventionSurveyModule,
    PreventionReportModule,
    ManagementAddressModule,
    ManagementAccessModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
