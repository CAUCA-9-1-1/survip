import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { FormModule } from '../../form/form.module';
import { SurveyModule } from '../../survey/survey.module';
import { InterventionPlanModule } from '../../intervention-plan/intervention-plan.module';

import { ReportComponent } from './report/report.component';
import { MapsComponent } from './maps/maps.component';
import { SurveyComponent } from './survey/survey.component';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule,
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
export class InterventionSectionModule { }
