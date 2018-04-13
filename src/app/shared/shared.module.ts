import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { DxTabPanelModule, DxTextBoxModule } from 'devextreme-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../environments/environment';
//import {MenuComponent} from './components/menu/menu.component';
//import {MenuItemComponent} from './components/menu-item/menu-item.component';*/
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MultilangComponent } from './components/multilang/multilang.component';
//import {ToolbarBackComponent} from './components/toolbar-back/toolbar-back.component';
//import {FilterByPipe} from './pipes/filter.pipe';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
    declarations: [
        MultilangComponent,
        PageNotFoundComponent,
        ToolbarComponent,
        /*MenuComponent,
        MenuItemComponent,
        ToolbarBackComponent,
        FilterByPipe,*/
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        //ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MultilangComponent,
        ToolbarComponent,
        //MenuComponent,
        //ToolbarBackComponent,

        TranslateModule,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        //ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        DxTabPanelModule,
        DxTextBoxModule,

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
