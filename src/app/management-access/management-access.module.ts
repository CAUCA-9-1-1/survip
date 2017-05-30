import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {WebuserComponent} from './webuser/webuser.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    WebuserComponent
  ],
  declarations: [
    WebuserComponent
  ],
  providers: []
})
export class ManagementAccessModule { }
