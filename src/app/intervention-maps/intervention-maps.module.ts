import {NgModule} from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InterventionLayerDirective } from './intervention-layer/intervention-layer.directive';
import { InterventionService } from '../shared/services/intervention.service';
import { InspectionService } from '../shared/services/inspection.service';
import { RiskLevelService } from '../shared/services/risk-level.service';

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
    InterventionService,
    InspectionService,
    RiskLevelService,
  ]
})
export class InterventionMapsModule { }
