import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule, MatCardModule, MatDialogModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {
    DxButtonModule, DxChartModule,
    DxCheckBoxModule,
    DxDataGridModule, DxFormModule,
    DxListModule, DxPieChartModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxToolbarModule, DxTreeViewModule
} from 'devextreme-angular';

import {SharedModule} from './shared/shared.module';


class MockRouter {
    navigate = jasmine.createSpy('navigate');
}

const mockRouter = new MockRouter();


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        DxButtonModule,
        DxChartModule,
        DxPieChartModule,
        DxCheckBoxModule,
        DxDataGridModule,
        DxFormModule,
        DxListModule,
        DxSelectBoxModule,
        DxPopupModule,
        DxToolbarModule,
        DxTreeViewModule,

        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
    ],
    exports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,

        DxButtonModule,
        DxChartModule,
        DxPieChartModule,
        DxCheckBoxModule,
        DxDataGridModule,
        DxFormModule,
        DxListModule,
        DxSelectBoxModule,
        DxPopupModule,
        DxToolbarModule,
        DxTreeViewModule,

        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
    ],
    providers: [{
        provide: APP_BASE_HREF,
        useValue: '/',
    }, {
        provide: Router,
        useValue: mockRouter,
    }, TranslateService],
})
export class TestModule { }
