import {NgModule} from '@angular/core';
import {DxDataGridModule, DxChartModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ApisactionComponent} from './apisaction/apisaction.component';
import {FireSafetyDepartmentComponent} from './firesafetydepartment/firesafetydepartment.component';
import {PermissionComponent} from './permission/permission.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {WebuserComponent} from './webuser/webuser.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule,
    DxChartModule,
    DxFormModule,
    DxTreeViewModule,
  ],
  exports: [
    ApisactionComponent,
    FireSafetyDepartmentComponent,
    PermissionComponent,
    StatisticsComponent,
    WebuserComponent,
  ],
  declarations: [
    ApisactionComponent,
    FireSafetyDepartmentComponent,
    PermissionComponent,
    StatisticsComponent,
    WebuserComponent,
  ],
  providers: []
})
export class ManagementAccessModule { }
