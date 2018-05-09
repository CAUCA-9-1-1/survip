import {NgModule} from '@angular/core';

import {InspectionApprovalComponent} from './inspection-approval.component';
import {SharedModule} from '../shared/shared.module';
import { SectionListComponent } from './section-list/section-list.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import { SurveyComponent } from './survey/survey.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PnapsComponent } from './pnaps/pnaps.component';
import { HazardousMaterialsComponent } from './hazardous-materials/hazardous-materials.component';
import { AlarmPanelsComponent } from './alarm-panels/alarm-panels.component';
import { WaterSprinklerComponent } from './water-sprinkler/water-sprinkler.component';
import { ParticularRisksComponent } from './particular-risks/particular-risks.component';
import { AnomaliesComponent } from './anomalies/anomalies.component';


@NgModule({
    declarations: [
        InspectionApprovalComponent,
        SectionListComponent,
        BuildingDetailsComponent,
        SurveyComponent,
        ContactsComponent,
        PnapsComponent,
        HazardousMaterialsComponent,
        AlarmPanelsComponent,
        WaterSprinklerComponent,
        ParticularRisksComponent,
        AnomaliesComponent
    ],
    imports: [
        SharedModule
    ],
})
export class InspectionApprovalModule { }
