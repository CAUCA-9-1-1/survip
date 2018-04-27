import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';
import {SharedModule} from './shared/shared.module';
import {UserAccessModule} from './user-access/user-access.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementAccessModule} from './management-access/management-access.module';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {ManagementFireHydrantModule} from './management-fire-hydrant/management-fire-hydrant.module';
import {ManagementSurveyModule} from './management-survey/management-survey.module';
import {InspectionDashboardModule} from './inspection-dashboard/inspection-dashboard.module';
import {InspectionBatchModule} from './inspection-batch/inspection-batch.module';
import {InspectionApprovalModule} from './inspection-approval/inspection-approval.module';
import {ManagementBuildingModule} from './management-building/management-building.module';
import {InspectionManagementModule} from './inspection-management/inspection-management.module';
import {StatisticsModule} from './statistics/statistics.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';


@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
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
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy,
    }],
})
export class AppModule { }
