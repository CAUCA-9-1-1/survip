import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementBuildingComponent} from './management-building.component';
import {ListComponent} from './list/list.component';
import {RiskLevelComponent} from './risk-level/risk-level.component';
import {UtilisationCodeComponent} from './utilisation-code/utilisation-code.component';
import {PersonRequiringAssistanceTypeComponent} from './person-requiring-assistance-type/person-requiring-assistance-type.component';
import {HazardousMaterialComponent} from './hazardous-material/hazardous-material.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [],
  declarations: [
    ManagementBuildingComponent,
    ListComponent,
    RiskLevelComponent,
    UtilisationCodeComponent,
    PersonRequiringAssistanceTypeComponent,
    HazardousMaterialComponent,
  ]
})
export class ManagementBuildingModule { }
