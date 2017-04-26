import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './question/question.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    QuestionComponent,
  ],
  declarations: [
    QuestionComponent,
  ],
  providers: [
  ]
})
export class PreventionSurveyModule { }
