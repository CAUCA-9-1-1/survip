import {NgModule} from '@angular/core';

import {InspectionApprovalComponent} from './inspection-approval.component';
import {SharedModule} from '../shared/shared.module';
import { SectionListComponent } from './section-list/section-list.component';


@NgModule({
    declarations: [
        InspectionApprovalComponent,
        SectionListComponent
    ],
    imports: [
        SharedModule
    ],
})
export class InspectionApprovalModule { }
