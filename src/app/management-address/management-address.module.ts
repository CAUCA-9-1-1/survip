import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementAddressComponent} from './management-address.component';
import {CityComponent} from './city/city.component';
import {CityTypeComponent} from './city-type/city-type.component';
import {CountryComponent} from './country/country.component';
import {CountyComponent} from './county/county.component';
import {LaneComponent} from './lane/lane.component';
import {RegionComponent} from './region/region.component';
import {StateComponent} from './state/state.component';

@NgModule({
  declarations: [
    ManagementAddressComponent,
    CityComponent,
    CityTypeComponent,
    CountryComponent,
    CountyComponent,
    LaneComponent,
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
