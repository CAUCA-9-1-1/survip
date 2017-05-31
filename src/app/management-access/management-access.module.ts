import {NgModule} from '@angular/core';
import {DxDataGridModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {FireSafetyDepartmentComponent} from './firesafetydepartment/firesafetydepartment.component';
import {PermissionComponent} from './permission/permission.component';
import {WebuserComponent} from './webuser/webuser.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule,
    DxTreeViewModule,
  ],
  exports: [
    FireSafetyDepartmentComponent,
    PermissionComponent,
    WebuserComponent,
  ],
  declarations: [
    FireSafetyDepartmentComponent,
    PermissionComponent,
    WebuserComponent,
  ],
  providers: []
})
export class ManagementAccessModule { }
