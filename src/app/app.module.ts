import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mockdata/in-memory-data.service';

import { SharedModule } from './shared/shared.module';
import { InterventionMapsModule } from './intervention-maps/intervention-maps.module';
import { InterventionReportModule } from './intervention-report/intervention-report.module';
import { InterventionSurveyModule } from './intervention-survey/intervention-survey.module';
import { PreventionSurveyModule } from './prevention-survey/prevention-survey.module';
import { ManagementAddressModule } from './management-address/management-address.module';

import { InterventionMapsComponent } from './intervention-maps/intervention-maps.component';
import { InterventionReportComponent } from './intervention-report/intervention-report.component';
import { InterventionSurveyComponent } from './intervention-survey/intervention-survey.component';
import { PreventionSurveyComponent } from './prevention-survey/prevention-survey.component';
import { ManagementAddressComponent } from './management-address/management-address.component';
import {InterventionBuildingComponent} from './intervention-building/intervention-building.component';
import {InterventionBuildingModule} from './intervention-building/intervention-building.module';

@NgModule({
  declarations: [
    AppComponent,
    InterventionMapsComponent,
    InterventionReportComponent,
    InterventionSurveyComponent,
    InterventionBuildingComponent,
    PreventionSurveyComponent,
    ManagementAddressComponent,
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
    PreventionSurveyModule,
    ManagementAddressModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
