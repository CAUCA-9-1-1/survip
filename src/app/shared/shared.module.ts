import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { IgoModule } from 'igo2';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WindowRefService } from './window-ref.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
  ],
  providers: [
    WindowRefService
  ]
})

export class SharedModule { }
