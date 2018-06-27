import { Component, OnInit } from '@angular/core';

import {environment} from '../../../environments/environment';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-managementfirehydrant-unitofmeasure',
    templateUrl: './unit-of-measure.component.html',
    styleUrls: ['./unit-of-measure.component.scss'],
    providers: [UnitOfMeasureService]
})
export class UnitOfMeasureComponent extends GridWithCrudService implements OnInit {
    measureTypes = [];

    constructor(
        translateService: TranslateService,
        unitOfMeasureService: UnitOfMeasureService
    ) {
        super(unitOfMeasureService);

        translateService.get([
            'rate', 'pressure', 'diameter', 'capacity', 'dimension'
        ]).subscribe(labels => {
            this.measureTypes.push({id: 0, name: labels['rate']});
            this.measureTypes.push({id: 1, name: labels['pressure']});
            this.measureTypes.push({id: 2, name: labels['diameter']});
            this.measureTypes.push({id: 3, name: labels['capacity']});
            this.measureTypes.push({id: 4, name: labels['dimension']});
        });
    }

    setModel(data: any) {
        return UnitOfMeasure.fromJSON(data);
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
