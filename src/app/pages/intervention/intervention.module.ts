import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FormModule } from '../../form/form.module';

import {InterventionPlanModule} from '../../intervention-plan/intervention-plan.module';
import {ReportComponent} from './report/report.component';
import { MapsComponent } from './maps/maps.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormModule,
    InterventionPlanModule
  ],
  exports: [
  ],
  declarations: [
    ReportComponent,
    MapsComponent
  ]
})
export class InterventionModule { }
