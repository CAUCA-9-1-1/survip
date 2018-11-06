import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';
import {SharedModule} from './shared/shared.module';
import {UserAccessModule} from './user-access/user-access.module';
import {ManagementAddressModule} from './management-address/management-address.module';
import {ManagementDepartmentModule} from './management-department/management-department.module';
import {ManagementTypeSystemModule} from './management-type-system/management-type-system.module';
import {ManagementSurveyModule} from './management-survey/management-survey.module';
import {InspectionDashboardModule} from './inspection-dashboard/inspection-dashboard.module';
import {InspectionBatchModule} from './inspection-batch/inspection-batch.module';
import {InspectionApprovalModule} from './inspection-approval/inspection-approval.module';
import {StatisticsModule} from './statistics/statistics.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ReportConfigurationModule} from './report-configuration/report-configuration.module';
import {ManagementSystemModule} from './management-system/management-system.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ExpiredTokenInterceptor} from './shared/services/expired-token.interceptor';
import {RefreshTokenService} from './shared/services/refresh-token.service';

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
        ManagementAddressModule,
        ManagementDepartmentModule,
        ManagementTypeSystemModule,
        ManagementSurveyModule,
        ManagementSystemModule,
        UserAccessModule,
        StatisticsModule,
        AppRoutingModule,
        ReportConfigurationModule,
    ],
    providers: [
      RefreshTokenService,
      HttpClientModule,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ExpiredTokenInterceptor,
        multi: true
      },
      {
        provide: LocationStrategy,
        useClass: HashLocationStrategy,
    }],
})
export class AppModule { }
