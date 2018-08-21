import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatDialogModule, MatSelectModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {DxButtonModule, DxDataGridModule, DxSelectBoxModule} from 'devextreme-angular';

import {InspectionApprovalComponent} from './inspection-approval.component';
import {SharedModule} from '../shared/shared.module';
import {SectionListComponent} from './section-list/section-list.component';
import {BuildingDetailsComponent} from './building-details/building-details.component';
import {InspectionSurveyComponent} from './inspection-survey/inspection-survey.component';
import {BuildingContactsComponent} from './building-contacts/building-contacts.component';
import {BuildingPnapsComponent} from './building-pnaps/building-pnaps.component';
import {BuildingHazardousMaterialsComponent} from './building-hazardous-materials/building-hazardous-materials.component';
import {BuildingFireProtectionComponent} from './building-fire-protection/building-fire-protection.component';
import {InspectionWaterSupplyComponent} from './inspection-water-supply/inspection-water-supply.component';
import {BuildingParticularRisksComponent} from './building-particular-risks/building-particular-risks.component';
import {BuildingAnomaliesComponent} from './building-anomalies/building-anomalies.component';
import {InspectionGeneralInfoComponent} from './inspection-general-info/inspection-general-info.component';
import {InspectionImplantationPlanComponent} from './inspection-implantation-plan/inspection-implantation-plan.component';
import {InspectionCourseComponent} from './inspection-course/inspection-course.component';
import {BuildingListComponent} from './building-list/building-list.component';
import {AskNewThemeComponent} from './ask-new-theme/ask-new-theme.component';


@NgModule({
    declarations: [
        InspectionApprovalComponent,
        SectionListComponent,
        BuildingDetailsComponent,
        InspectionSurveyComponent,
        BuildingContactsComponent,
        BuildingPnapsComponent,
        BuildingHazardousMaterialsComponent,
        BuildingFireProtectionComponent,
        InspectionWaterSupplyComponent,
        BuildingParticularRisksComponent,
        BuildingAnomaliesComponent,
        InspectionGeneralInfoComponent,
        InspectionImplantationPlanComponent,
        InspectionCourseComponent,
        BuildingListComponent,
        AskNewThemeComponent,
    ],
    entryComponents: [
        AskNewThemeComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatSelectModule,

        DxButtonModule,
        DxDataGridModule,
        DxSelectBoxModule,
    ],
})
export class InspectionApprovalModule { }
