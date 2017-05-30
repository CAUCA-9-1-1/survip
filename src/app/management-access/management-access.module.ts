import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {FireSafetyDepartmentComponent} from './firesafetydepartment/firesafetydepartment.component';
import {WebuserComponent} from './webuser/webuser.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    FireSafetyDepartmentComponent,
    WebuserComponent,
  ],
  declarations: [
    FireSafetyDepartmentComponent,
    WebuserComponent,
  ],
  providers: []
})
export class ManagementAccessModule { }
