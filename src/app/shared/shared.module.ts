import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {
  IgoModule,
  LanguageLoader,
  LanguageService,
  provideLanguageLoader,
} from 'igo2';

import {} from '../core/extends-prototype';
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
import {FilterByPipe} from './pipes/filter.pipe';
import {PinchZoomDirective} from './directives/pinch-zoom.directive';
import {FullscreenDialogComponent} from './components/fullscreen-dialog/fullscreen-dialog.component';
import {WaitDialogComponent} from './components/wait-dialog/wait-dialog.component';
import {LoaderComponent} from './components/loader/loader.component';
import {HttpService} from '../core/http/http.service';
import {LoaderService} from './services/loader.service';
import {AuthorizeRequestOptions} from '../core/http/authorize-request-options';

export function translateLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}
export function httpServiceFactory(backend: XHRBackend, options: AuthorizeRequestOptions, loaderService: LoaderService) {
  return new HttpService(backend, options, loaderService);
}

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    ToolbarComponent,
    /*MenuComponent,
    MenuItemComponent,
    TakePictureComponent,
    ToolbarBackComponent,
    WebcamComponent,
    FullscreenDialogComponent,
    YesNoDialogComponent,
    WaitDialogComponent,
    FilterByPipe,
    PinchZoomDirective,*/
  ],
  entryComponents: [
    /*WebcamComponent,
    FullscreenDialogComponent,
    YesNoDialogComponent,
    WaitDialogComponent,*/
  ],
  exports: [
    IgoModule,
    CommonModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,

    LoaderComponent,
    ToolbarComponent,
    /*
    ReactiveFormsModule,
    FormsModule,

    MenuComponent,
    PageNotFoundComponent,

    ToolbarBackComponent,
    TakePictureComponent,
    PinchZoomDirective,*/
  ],
  imports: [
    IgoModule.forRoot(),
    CommonModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    /*
    ReactiveFormsModule,
    FormsModule,
    */
  ],
  providers: [
    provideLanguageLoader(translateLoader),
    LanguageService,
    LoaderService,
    WindowRefService,
    DialogsService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService ]
    }
  ]
})
export class SharedModule { }
