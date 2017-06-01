import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './mockdata/in-memory-data.service';

import {SharedModule} from './shared/shared.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {ManagementAccessModule} from './management-access/management-access.module';
import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {ManagementBuildingComponent} from './management-building/management-building.component';


@NgModule({
  declarations: [
    AppComponent,
    ManagementAddressComponent,
    ManagementAccessComponent,
    ManagementBuildingComponent,
  ],
  imports: [
    SharedModule,

    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true
    }),

    ManagementAddressModule,
    ManagementAccessModule,
    ManagementBuildingModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
