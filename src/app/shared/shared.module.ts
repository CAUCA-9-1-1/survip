import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {DxTabPanelModule, DxTextBoxModule} from 'devextreme-angular';
import {environment} from '../../environments/environment';

import {
  IgoModule,
  provideConfigOptions,
} from 'igo2';

import {
  CauseModule,
  provideConfig,
} from 'cause-lib';

import {} from '../core/extends-prototype';
import {MenuComponent} from './components/menu/menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TakePictureComponent} from './components/take-picture/take-picture.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ToolbarBackComponent} from './components/toolbar-back/toolbar-back.component';
import {WebcamComponent} from './components/webcam/webcam.component';
import {DialogsService} from './services/dialogs.service';
import {YesNoDialogComponent} from './components/yes-no-dialog/yes-no-dialog.component';
import {FilterByPipe} from './pipes/filter.pipe';
import {PinchZoomDirective} from './directives/pinch-zoom.directive';
import {FullscreenDialogComponent} from './components/fullscreen-dialog/fullscreen-dialog.component';
import {WaitDialogComponent} from './components/wait-dialog/wait-dialog.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ToolbarComponent,
    MenuComponent,
    MenuItemComponent,
    TakePictureComponent,
    ToolbarBackComponent,
    WebcamComponent,
    FullscreenDialogComponent,
    YesNoDialogComponent,
    WaitDialogComponent,
    FilterByPipe,
    PinchZoomDirective,
  ],
  entryComponents: [
    WebcamComponent,
    FullscreenDialogComponent,
    YesNoDialogComponent,
    WaitDialogComponent,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    IgoModule,
    CauseModule,

    ToolbarComponent,
    /*
    ReactiveFormsModule,
    FormsModule,*/

    MenuComponent,
    PageNotFoundComponent,

    ToolbarBackComponent,
    TakePictureComponent,
    PinchZoomDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    DxTabPanelModule,
    DxTextBoxModule,
    IgoModule.forRoot(),
    CauseModule.forRoot(),
    /*
    ReactiveFormsModule,
    FormsModule,
    */
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      // path: './assets/config-igo.json'
    }),
    provideConfig({
      default: environment.cause,
      // path: './assets/config-cause.json'
    }),
    DialogsService,
  ]
})
export class SharedModule { }
