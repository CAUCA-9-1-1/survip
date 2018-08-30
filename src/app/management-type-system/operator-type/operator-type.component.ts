import {Component, OnInit} from '@angular/core';

import {OperatorTypeService} from '../shared/services/operator-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {OperatorType} from '../shared/models/operator-type.model';


@Component({
    selector: 'app-management-system-operator-type',
    templateUrl: './operator-type.component.html',
    styleUrls: ['./operator-type.component.scss'],
    providers: [OperatorTypeService]
})
export class OperatorTypeComponent extends GridWithCrudService implements OnInit {

    constructor(operatorTypeService: OperatorTypeService) {
        super(operatorTypeService);
    }

    setModel(data: any) {
        return OperatorType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
