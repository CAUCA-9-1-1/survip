import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
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
import {DxButtonModule, DxTabPanelModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MultilangComponent} from './components/multilang/multilang.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {SlideshowComponent} from './components/slideshow/slideshow.component';
import { ImageComponent } from './components/image/image.component';
import { UploadComponent } from './components/upload/upload.component';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
    declarations: [
        PageNotFoundComponent,
        MainMenuComponent,
        MultilangComponent,
        SlideshowComponent,
        ImageComponent,
        UploadComponent,
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

        DxTabPanelModule,
        DxTextBoxModule,
        DxValidatorModule,

        TranslateModule,
        MainMenuComponent,
        MultilangComponent,
        SlideshowComponent,
        ImageComponent,
        UploadComponent,
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
        DxTabPanelModule,
        DxTextBoxModule,
        DxValidatorModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        HttpClientModule,
    ]
})
export class SharedModule { }
