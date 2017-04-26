import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { IgoModule } from 'igo2';
import { WindowRefService } from './window-ref.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
    TranslateModule,
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
    TranslateModule,
  ],
  providers: [
    WindowRefService
  ]
})
export class SharedModule { }
