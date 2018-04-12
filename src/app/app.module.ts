import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { SharedModule } from './shared/shared.module';
import { UserAccessModule } from './user-access/user-access.module';
import { ManagementAddressModule } from './management-address/management-address.module';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        ManagementAddressModule,
        UserAccessModule,
        AppRoutingModule,
    ],
    providers: [],
})
export class AppModule { }
