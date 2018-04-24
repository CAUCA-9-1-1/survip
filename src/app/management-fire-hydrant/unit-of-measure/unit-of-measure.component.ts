import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';


@Component({
    selector: 'app-managementfirehydrant-unitofmeasure',
    templateUrl: './unit-of-measure.component.html',
    styleUrls: ['./unit-of-measure.component.scss'],
    providers: [UnitOfMeasureService]
})
export class UnitOfMeasureComponent extends GridWithCrudService implements OnInit {

    constructor(unitOfMeasureService: UnitOfMeasureService) {
        super(unitOfMeasureService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getUnitName(data) {
        const unit = UnitOfMeasure.fromJSON(data);

        return unit.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
