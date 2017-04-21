import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AdditionalInformationComponent} from './additional-information/additional-information.component';
import {AddressComponent} from './address/address.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {AddressService} from './shared/address.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule
  ],
  exports: [
    AdditionalInformationComponent,
    AddressComponent,
    ProtocolComponent,
    FlexLayoutModule
  ],
  declarations: [
    AdditionalInformationComponent,
    AddressComponent,
    ProtocolComponent
  ],
  providers: [
    AddressService
  ]
})
export class InterventionPlanModule { }
