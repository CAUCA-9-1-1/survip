import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';

import {SharedModule} from './shared/shared.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {ManagementAccessModule} from './management-access/management-access.module';
import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {ManagementBuildingComponent} from './management-building/management-building.component';
import {ManagementSurveyModule} from './management-survey/management-survey.module';
import {ManagementSurveyComponent} from './management-survey/management-survey.component';


@NgModule({
  declarations: [
    AppComponent,
    ManagementAddressComponent,
    ManagementAccessComponent,
    ManagementBuildingComponent,
    ManagementSurveyComponent,
  ],
  imports: [
    SharedModule,
    ManagementAddressModule,
    ManagementAccessModule,
    ManagementBuildingModule,
    ManagementSurveyModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
