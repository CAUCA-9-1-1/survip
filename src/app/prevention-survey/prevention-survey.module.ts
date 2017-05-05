import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './question/question.component';
import { QuestionSliderComponent } from './question-slider/question-slider.component';
import { SurveyQuestionService } from './shared/services/survey-question.service';
import { InspectionQuestionService } from './shared/services/inspection-question.service';

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
    SurveyQuestionService,
    InspectionQuestionService
  ]
})
export class PreventionSurveyModule { }
