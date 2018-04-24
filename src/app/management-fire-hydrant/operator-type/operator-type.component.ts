import { Component, OnInit } from '@angular/core';

import {OperatorTypeService} from '../shared/services/operator-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementfirehydrant-operatortype',
    templateUrl: './operator-type.component.html',
    styleUrls: ['./operator-type.component.styl'],
    providers: [OperatorTypeService]
})
export class OperatorTypeComponent extends GridWithCrudService implements OnInit {

    constructor(operatorTypeService: OperatorTypeService) {
        super(operatorTypeService);
    }

    ngOnInit() {
        this.loadSource();
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
