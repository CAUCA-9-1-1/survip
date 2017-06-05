import {NgModule} from '@angular/core';
import {DxDataGridModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule,
    DxTreeViewModule,
  ],
  exports: [
    ListComponent,
    QuestionComponent
  ],
  declarations: [
    ListComponent,
    QuestionComponent,
  ]
})
export class ManagementSurveyModule { }
