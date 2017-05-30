import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {CountryComponent} from './country/country.component';
import {CountyComponent} from './county/county.component';
import {RegionComponent} from './region/region.component';
import {StateComponent} from './state/state.component';
import {CityComponent} from './city/city.component';
import {CityTypeComponent} from './citytype/citytype.component';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  exports: [
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent,
    CityComponent,
    CityTypeComponent,
  ],
  declarations: [
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent,
    CityComponent,
    CityTypeComponent,
  ],
  providers: []
})
export class ManagementAddressModule { }
