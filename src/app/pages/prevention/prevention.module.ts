import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FormModule } from '../../form/form.module';
import { PreventionModule } from '../../prevention/prevention.module';

import { SurveyComponent } from './survey/survey.component';

@NgModule({
  imports: [
    SharedModule,
    FormModule,
    PreventionModule,
  ],
  exports: [
  ],
  declarations: [
    SurveyComponent,
  ]
})
export class PreventionSectionModule { }
