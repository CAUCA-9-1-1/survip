import {TestBed, async} from '@angular/core/testing';

import {TestModule} from './test.module.spec';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';
import {UserAccessModule} from './user-access/user-access.module';
import {InspectionApprovalModule} from './inspection-approval/inspection-approval.module';
import {ManagementAccessModule} from './management-access/management-access.module';
import {ManagementFireHydrantModule} from './management-fire-hydrant/management-fire-hydrant.module';
import {InspectionManagementModule} from './inspection-management/inspection-management.module';
import {InspectionBatchModule} from './inspection-batch/inspection-batch.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {StatisticsModule} from './statistics/statistics.module';
import {InspectionDashboardModule} from './inspection-dashboard/inspection-dashboard.module';
import {ManagementSurveyModule} from './management-survey/management-survey.module';


describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                InspectionApprovalModule,
                InspectionBatchModule,
                InspectionDashboardModule,
                InspectionManagementModule,
                ManagementAddressModule,
                ManagementAccessModule,
                ManagementBuildingModule,
                ManagementFireHydrantModule,
                ManagementSurveyModule,
                UserAccessModule,
                StatisticsModule,
                AppRoutingModule,
            ],
            declarations: [
                AppComponent,
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));

    it('should render toolbar with a title', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.mat-toolbar .title').textContent).toContain('SURVI-Prévention');
    }));
});
