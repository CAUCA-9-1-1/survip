import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {InspectionService} from '../shared/services/inspection.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
  ],
  providers: [
    InspectionService
  ]
})
export class InterventionListModule { }
