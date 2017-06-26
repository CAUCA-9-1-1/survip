import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementBuildingComponent} from './management-building.component';
import {ListComponent} from './list/list.component';
import {RiskLevelComponent} from './risk-level/risk-level.component';
import {UtilisationCodeComponent} from './utilisation-code/utilisation-code.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    ListComponent,
    RiskLevelComponent,
    UtilisationCodeComponent,
  ],
  declarations: [
    ManagementBuildingComponent,
    ListComponent,
    RiskLevelComponent,
    UtilisationCodeComponent,
  ]
})
export class ManagementBuildingModule { }
