import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormModule } from '../form/form.module';
import { InterventionReportModule } from '../intervention-report/intervention-report.module';
import { PreventionSurveyModule } from '../prevention-survey/prevention-survey.module';
import { InterventionSurveyModule } from '../intervention-survey/intervention-survey.module';

import { InterventionMapsComponent } from './intervention-maps/intervention-maps.component';
import { InterventionReportComponent } from './intervention-report/intervention-report.component';
import { InterventionSurveyComponent } from './intervention-survey/intervention-survey.component';
import { PreventionSurveyComponent } from './prevention-survey/prevention-survey.component';

@NgModule({
  imports: [
    SharedModule,
    FormModule,
    InterventionReportModule,
    PreventionSurveyModule,
    InterventionSurveyModule,
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
