import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material';

import {InspectionApprovalComponent} from './inspection-approval.component';
import {SharedModule} from '../shared/shared.module';
import {SectionListComponent} from './section-list/section-list.component';
import {BuildingDetailsComponent} from './building-details/building-details.component';
import {SurveyComponent} from './survey/survey.component';
import {ContactsComponent} from './contacts/contacts.component';
import {PnapsComponent} from './pnaps/pnaps.component';
import {HazardousMaterialsComponent} from './hazardous-materials/hazardous-materials.component';
import {FireProtectionComponent} from './fire-protection/fire-protection.component';
import {WaterSupplyComponent} from './water-supply/water-supply.component';
import {ParticularRisksComponent} from './particular-risks/particular-risks.component';
import {AnomaliesComponent} from './anomalies/anomalies.component';
import {GeneralInfoComponent} from './general-info/general-info.component';
import {ImplantationPlanComponent} from './implantation-plan/implantation-plan.component';
import {CourseComponent} from './course/course.component';
import {BuildingListComponent} from './building-list/building-list.component';


@NgModule({
    declarations: [
        InspectionApprovalComponent,
        SectionListComponent,
        BuildingDetailsComponent,
        SurveyComponent,
        ContactsComponent,
        PnapsComponent,
        HazardousMaterialsComponent,
        FireProtectionComponent,
        WaterSupplyComponent,
        ParticularRisksComponent,
        AnomaliesComponent,
        GeneralInfoComponent,
        ImplantationPlanComponent,
        CourseComponent,
        BuildingListComponent
    ],
    imports: [
        SharedModule,
        MatCardModule,
    ],
})
export class InspectionApprovalModule { }
