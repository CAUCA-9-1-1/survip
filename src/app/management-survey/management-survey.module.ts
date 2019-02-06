import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxFormModule, DxTreeViewModule, DxPopupModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementSurveyComponent} from './management-survey.component';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';

@NgModule({
  declarations: [
    ManagementSurveyComponent,
    ListComponent,
    QuestionComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxTreeViewModule,
    DxPopupModule,
  ],
  providers: [],
})
export class ManagementSurveyModule { }
