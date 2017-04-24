import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import {BuildingComponent} from './building/building.component';
import {BuildingDetailComponent} from './building-detail/building-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule
  ],
  exports: [
    BuildingDetailComponent,
    BuildingComponent,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
  ],
  providers: [
      ]
})
export class SurveyModule { }
