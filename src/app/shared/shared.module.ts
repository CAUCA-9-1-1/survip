import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { IgoModule } from 'igo2';
import { TakePictureComponent } from './components/take-picture/take-picture.component';
import { WindowRefService } from './window-ref.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
    TranslateModule,
  ],
  declarations: [
    TakePictureComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
    TranslateModule,
    TakePictureComponent,
  ],
  providers: [
    WindowRefService
  ]
})
export class SharedModule { }
