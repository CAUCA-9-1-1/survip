import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InterventionService } from './shared/intervention.service';
import { InterventionLayerDirective } from './intervention-layer/intervention-layer.directive';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    InterventionLayerDirective
  ],
  declarations: [
    InterventionLayerDirective
  ],
  providers: [
    InterventionService
  ]
})
export class InterventionMapsModule { }
