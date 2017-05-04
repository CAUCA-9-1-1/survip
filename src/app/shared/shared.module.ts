import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { IgoModule } from 'igo2';
import { TakePictureComponent } from './components/take-picture/take-picture.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarBackComponent } from './components/toolbar-back/toolbar-back.component';
import { WindowRefService } from './services/window-ref.service';
import { WebcamComponent } from './components/webcam/webcam.component';

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
    ToolbarComponent,
    ToolbarBackComponent,
    WebcamComponent,
  ],
  entryComponents: [
    WebcamComponent,
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
    ToolbarComponent,
    ToolbarBackComponent,
    TakePictureComponent,
  ],
  providers: [
    WindowRefService
  ]
})
export class SharedModule { }
