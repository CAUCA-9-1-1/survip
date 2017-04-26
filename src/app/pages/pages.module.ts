import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormModule } from '../form/form.module';
import { InterventionPlanModule } from '../intervention-plan/intervention-plan.module';
import { PreventionModule } from '../prevention/prevention.module';
import { SurveyModule } from '../survey/survey.module';

import { InterventionMapsComponent } from './intervention-maps/intervention-maps.component';
import { InterventionReportComponent } from './intervention-report/intervention-report.component';
import { InterventionSurveyComponent } from './intervention-survey/intervention-survey.component';
import { PreventionSurveyComponent } from './prevention-survey/prevention-survey.component';

@NgModule({
  imports: [
    SharedModule,
    FormModule,
    InterventionPlanModule,
    PreventionModule,
    SurveyModule,
  ],
  exports: [
  ],
  declarations: [
    InterventionMapsComponent,
    InterventionReportComponent,
    InterventionSurveyComponent,
    PreventionSurveyComponent,
  ]
})
export class PagesModule { }
