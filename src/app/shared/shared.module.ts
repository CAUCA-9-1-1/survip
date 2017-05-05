import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { IgoModule } from 'igo2';

import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TakePictureComponent } from './components/take-picture/take-picture.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarBackComponent } from './components/toolbar-back/toolbar-back.component';
import { WindowRefService } from './services/window-ref.service';
import { WebcamComponent } from './components/webcam/webcam.component';
import { DialogsService } from './services/dialogs.service';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
  ],
  declarations: [
    MenuComponent,
    MenuItemComponent,
    PageNotFoundComponent,
    TakePictureComponent,
    ToolbarComponent,
    ToolbarBackComponent,
    WebcamComponent,
    YesNoDialogComponent
  ],
  entryComponents: [
    WebcamComponent,
    YesNoDialogComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule,
    MenuComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    ToolbarBackComponent,
    TakePictureComponent,
  ],
  providers: [
    WindowRefService,
    DialogsService
  ]
})
export class SharedModule { }
