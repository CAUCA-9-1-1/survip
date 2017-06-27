import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';

import {SharedModule} from './shared/shared.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementAccessModule} from './management-access/management-access.module';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {ManagementInterventionPlanModule} from './management-intervention-plan/management-intervention-plan.module';
import {ManagementInspectionModule} from './management-inspection/management-inspection.module';
import {ManagementSurveyModule} from './management-survey/management-survey.module';
import {ManagementFireHydrantModule} from './management-fire-hydrant/management-fire-hydrant.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    ManagementAddressModule,
    ManagementAccessModule,
    ManagementBuildingModule,
    ManagementFireHydrantModule,
    ManagementInterventionPlanModule,
    ManagementInspectionModule,
    ManagementSurveyModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
