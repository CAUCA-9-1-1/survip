import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {BuildingComponent} from './building/building.component';


@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    BuildingComponent
  ],
  declarations: [
    BuildingComponent
  ]
})
export class ManagementBuildingModule { }
