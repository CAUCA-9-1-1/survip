import { NgModule } from '@angular/core';

import { provideContextServiceOptions } from 'igo2';

import { SharedModule } from '../shared/shared.module';
import { InterventionLayerDirective } from './intervention-layer/intervention-layer.directive';
import { InterventionService } from './shared/intervention.service';
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
    provideContextServiceOptions({
      basePath: './contexts',
      contextListFile: '_contexts.json'
    })
  ]
})
export class InterventionMapsModule { }
