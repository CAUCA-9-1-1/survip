import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoModule } from 'igo2';

import {InterventionPlanModule} from '../../intervention-plan/intervention-plan.module';
import {ReportComponent} from './report/report.component';
import { MapsComponent } from './maps/maps.component';

@NgModule({
  imports: [
    CommonModule,
    IgoModule.forRoot(),
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
