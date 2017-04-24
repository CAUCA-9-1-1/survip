import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FormModule } from '../../form/form.module';
import { SurveyModule } from '../../survey/survey.module';
import { InterventionPlanModule } from '../../intervention-plan/intervention-plan.module';

import { ReportComponent } from './report/report.component';
import { MapsComponent } from './maps/maps.component';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormModule,
    InterventionPlanModule,
    SurveyModule
  ],
  exports: [
  ],
  declarations: [
    ReportComponent,
    MapsComponent,
    SurveyComponent,
  ]
})
export class InterventionModule { }
