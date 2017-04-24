import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoModule } from 'igo2';

@NgModule({
  imports: [
    CommonModule,
    IgoModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    IgoModule
  ]
})
export class SharedModule { }
