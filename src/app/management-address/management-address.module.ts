import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { CountryComponent } from './country/country.component';
import { CountyComponent } from './county/county.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';
import { CountryService } from '../core/shared/services/country.service';

@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule
  ],
  declarations: [
    CountryComponent,
    CountyComponent,
    RegionComponent,
    StateComponent
  ],
  providers: [
    CountryService
  ]
})
export class ManagementAddressModule { }
