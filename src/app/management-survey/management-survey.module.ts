import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ListComponent} from './list/list.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    ListComponent
  ],
  declarations: [
    ListComponent
  ]
})
export class ManagementSurveyModule { }
