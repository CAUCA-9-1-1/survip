import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Http} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {
  IgoModule,
  LanguageLoader,
  provideLanguageLoader,
} from 'igo2';

import {MenuComponent} from './components/menu/menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TakePictureComponent} from './components/take-picture/take-picture.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ToolbarBackComponent} from './components/toolbar-back/toolbar-back.component';
import {WindowRefService} from './services/window-ref.service';
import {WebcamComponent} from './components/webcam/webcam.component';
import {DialogsService} from './services/dialogs.service';
import {YesNoDialogComponent} from './components/yes-no-dialog/yes-no-dialog.component';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {SearchListComponent} from './components/search-list/search-list.component';
import {FilterByPipe} from './pipes/filter.pipe';
import {CardLayoutComponent} from '../intervention-survey/card-layout/card-layout.component';
import {CardLayoutFactoryDirective} from '../intervention-survey/shared/control-factory.directive';
import {PinchZoomDirective} from './directives/pinch-zoom.directive';
import {FullscreenDialogComponent} from './components/fullscreen-dialog/fullscreen-dialog.component';
import {WaitDialogComponent} from './components/wait-dialog/wait-dialog.component';

export function translateLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    IgoModule.forRoot(),
  ],
  declarations: [
    MenuComponent,
    MenuItemComponent,
    PageNotFoundComponent,
    TakePictureComponent,
    ToolbarComponent,
    ToolbarBackComponent,
    WebcamComponent,
    FullscreenDialogComponent,
    YesNoDialogComponent,
    WaitDialogComponent,
    SearchBoxComponent,
    SearchListComponent,
    FilterByPipe,
    CardLayoutComponent,
    CardLayoutFactoryDirective,
    PinchZoomDirective,
  ],
  entryComponents: [
    WebcamComponent,
    FullscreenDialogComponent,
    YesNoDialogComponent,
    WaitDialogComponent,
    SearchListComponent
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
    SearchBoxComponent,
    CardLayoutComponent,
    PinchZoomDirective,
  ],
  providers: [
    WindowRefService,
    DialogsService,
    provideLanguageLoader(translateLoader),
  ]
})
export class SharedModule { }
