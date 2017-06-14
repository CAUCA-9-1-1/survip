import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementSurveyComponent} from './management-survey.component';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';

@NgModule({
  imports: [
    SharedModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxTreeViewModule,
  ],
  exports: [
    ListComponent,
    QuestionComponent
  ],
  declarations: [
    ManagementSurveyComponent,
    ListComponent,
    QuestionComponent,
  ]
})
export class ManagementSurveyModule { }
