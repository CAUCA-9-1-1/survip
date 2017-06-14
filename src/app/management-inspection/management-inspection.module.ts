import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementInspectionComponent} from './management-inspection.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule,
  ],
  declarations: [
    ManagementInspectionComponent,
    ListComponent
  ]
})
export class ManagementInspectionModule { }
