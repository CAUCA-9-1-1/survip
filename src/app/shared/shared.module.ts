import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {DxButtonModule, DxPopupModule, DxTabPanelModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {WebSketchToolModule} from 'lib-sketch-tool';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MultilangComponent} from './components/multilang/multilang.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {SlideshowComponent} from './components/slideshow/slideshow.component';
import {ImageComponent} from './components/image/image.component';
import {UploadComponent} from './components/upload/upload.component';
import {FilterByPipe} from './pipes/filter.pipe';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import {CauseCoreModule, Configuration} from '@cause-911/core';
const config = new Configuration();
config.languages = ['fr', 'en'];
config.libraries = ['devextreme', 'management'];


@NgModule({
    declarations: [
        PageNotFoundComponent,
        MainMenuComponent,
        MultilangComponent,
        SlideshowComponent,
        ImageComponent,
        UploadComponent,
        FilterByPipe,
        NoAccessComponent,
        GeolocationComponent,
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,

        DxPopupModule,
        DxTabPanelModule,
        DxTextBoxModule,
        DxValidatorModule,
        DxPopupModule,

        MainMenuComponent,
        MultilangComponent,
        SlideshowComponent,
        ImageComponent,
        UploadComponent,
        NoAccessComponent,
        GeolocationComponent,
        CauseCoreModule
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        DxButtonModule,
        DxPopupModule,
        DxTabPanelModule,
        DxTextBoxModule,
        DxValidatorModule,
        DxPopupModule,
        WebSketchToolModule,
      CauseCoreModule.forRoot(config),
    ],
    providers: [
    ]
})
export class SharedModule { }
