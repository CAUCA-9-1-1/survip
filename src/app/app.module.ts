import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';

import {SharedModule} from './shared/shared.module';
import {ManagementAccessModule} from './management-access/management-access.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {ManagementFireHydrantModule} from './management-fire-hydrant/management-fire-hydrant.module';
import {ManagementInterventionPlanModule} from './management-intervention-plan/management-intervention-plan.module';
import {ManagementInspectionModule} from './management-inspection/management-inspection.module';
import {ManagementSurveyModule} from './management-survey/management-survey.module';
import {UserAccessModule} from './user-access/user-access.module';


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    ManagementAccessModule,
    ManagementAddressModule,
    ManagementBuildingModule,
    ManagementFireHydrantModule,
    ManagementInterventionPlanModule,
    ManagementInspectionModule,
    ManagementSurveyModule,
    UserAccessModule,
    AppRoutingModule,
  ],
  providers: [
  ],
})
export class AppModule { }
