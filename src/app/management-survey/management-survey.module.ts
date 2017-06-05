import {NgModule} from '@angular/core';
import {DxDataGridModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule,
    DxFormModule,
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
