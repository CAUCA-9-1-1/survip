import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AdditionalInformationComponent} from './additional-information/additional-information.component';
import {ProtocolComponent} from './protocol/protocol.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule
  ],
  exports: [
    AdditionalInformationComponent,
    ProtocolComponent,
    FlexLayoutModule
  ],
  declarations: [
    AdditionalInformationComponent,
    ProtocolComponent
  ]
})
export class InterventionPlanModule { }
