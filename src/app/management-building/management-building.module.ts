import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxPopupModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementBuildingComponent} from './management-building.component';
import {ListComponent} from './list/list.component';
import {RiskLevelComponent} from './risk-level/risk-level.component';
import {UtilisationCodeComponent} from './utilisation-code/utilisation-code.component';
import {PersonRequiringAssistanceTypeComponent} from './person-requiring-assistance-type/person-requiring-assistance-type.component';
import {HazardousMaterialComponent} from './hazardous-material/hazardous-material.component';


@NgModule({
    declarations: [
        ManagementBuildingComponent,
        ListComponent,
        RiskLevelComponent,
        UtilisationCodeComponent,
        PersonRequiringAssistanceTypeComponent,
        HazardousMaterialComponent,
    ],
    exports: [],
    imports: [
        SharedModule,
        DxButtonModule,
        DxDataGridModule,
        DxPopupModule,
    ],
    providers: [],
})
export class ManagementBuildingModule { }
