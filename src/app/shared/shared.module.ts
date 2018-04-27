import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import { DxTabPanelModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MultilangComponent } from './components/multilang/multilang.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
//import {FilterByPipe} from './pipes/filter.pipe';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
    declarations: [
        MultilangComponent,
        PageNotFoundComponent,
        MainMenuComponent,
        /*FilterByPipe,*/
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
        MultilangComponent,

        TranslateModule,
        MainMenuComponent,
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
