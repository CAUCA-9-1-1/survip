import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './question/question.component';
import { QuestionSliderComponent } from './question-slider/question-slider.component';
import { QuestionService } from './shared/services/question.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    QuestionSliderComponent,
  ],
  declarations: [
    QuestionComponent,
    QuestionSliderComponent,
  ],
  providers: [
    QuestionService
  ]
})
export class PreventionSurveyModule { }
