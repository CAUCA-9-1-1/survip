import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CountryComponent } from './country/country.component';
import { CountyComponent } from './county/county.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent
  ]
})
export class ManagementAddressModule { }
