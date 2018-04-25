import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { SharedModule } from './shared/shared.module';
import { UserAccessModule } from './user-access/user-access.module';
import { ManagementAddressModule } from './management-address/management-address.module';
import { ManagementAccessModule } from './management-access/management-access.module';
import { DashboardInspectionModule } from './dashboard-inspection/dashboard-inspection.module';
import { ManagementFireHydrantModule } from './management-fire-hydrant/management-fire-hydrant.module';


@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        DashboardInspectionModule,
        ManagementAddressModule,
        ManagementAccessModule,
        ManagementFireHydrantModule,
        UserAccessModule,
        AppRoutingModule,
    ],
    providers: [],
})
export class AppModule { }
