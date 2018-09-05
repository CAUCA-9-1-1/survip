import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementAddressComponent} from './management-address.component';
import {CityComponent} from './city/city.component';
import {CountryComponent} from './country/country.component';
import {CountyComponent} from './county/county.component';
import {RegionComponent} from './region/region.component';
import {StateComponent} from './state/state.component';

@NgModule({
  declarations: [
    ManagementAddressComponent,
    CityComponent,
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  providers: []
})
export class ManagementAddressModule { }
