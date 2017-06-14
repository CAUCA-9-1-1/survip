import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementInspectionComponent} from './management-inspection.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';

@NgModule({
  imports: [
    SharedModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
  ],
  declarations: [
    ManagementInspectionComponent,
    ListComponent,
    CreateComponent,
  ],
  entryComponents: [
    CreateComponent,
  ]
})
export class ManagementInspectionModule { }
