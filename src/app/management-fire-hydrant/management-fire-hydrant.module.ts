import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { ManagementFireHydrantComponent } from './management-fire-hydrant.component';
import { ListComponent } from './list/list.component';
import { ConnectionComponent } from './connection/connection.component';
import { ConnectionTypeComponent } from './connection-type/connection-type.component';
import { TypeComponent } from './type/type.component';


@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  declarations: [
    ManagementFireHydrantComponent,
    ListComponent,
    ConnectionComponent,
    ConnectionTypeComponent,
    TypeComponent
  ]
})
export class ManagementFireHydrantModule { }
