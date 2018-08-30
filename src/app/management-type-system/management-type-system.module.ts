import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementTypeSystemComponent} from './management-type-system.component';
import {ConnectionTypeComponent} from './connection-type/connection-type.component';
import {FireHydrantTypeComponent} from './fire-hydrant-type/fire-hydrant-type.component';
import {OperatorTypeComponent} from './operator-type/operator-type.component';
import {UnitOfMeasureComponent} from './unit-of-measure/unit-of-measure.component';
import {PersonRequiringAssistanceTypeComponent} from './person-requiring-assistance-type/person-requiring-assistance-type.component';
import {CityTypeComponent} from './city-type/city-type.component';


@NgModule({
    declarations: [
        ManagementTypeSystemComponent,
        OperatorTypeComponent,
        UnitOfMeasureComponent,
        ConnectionTypeComponent,
        FireHydrantTypeComponent,
        PersonRequiringAssistanceTypeComponent,
        CityTypeComponent,
    ],
    imports: [
        SharedModule,
        DxDataGridModule,
    ],
})
export class ManagementTypeSystemModule { }
