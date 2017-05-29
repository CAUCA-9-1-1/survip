import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { CountryComponent } from './country/country.component';
import { CountyComponent } from './county/county.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent
  ],
  declarations: [
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent
  ],
  providers: []
})
export class ManagementAddressModule { }
