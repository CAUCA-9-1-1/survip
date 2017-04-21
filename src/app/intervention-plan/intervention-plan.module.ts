import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProtocolComponent} from './protocol/protocol.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
      ProtocolComponent
  ],
  declarations: [
      ProtocolComponent
  ]
})
export class InterventionPlanModule { }
