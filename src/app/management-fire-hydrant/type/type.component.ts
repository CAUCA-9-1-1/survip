import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementfirehydrant-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.styl'],
    providers: [FireHydrantTypeService]
})
export class TypeComponent extends GridWithCrudService implements OnInit {

    constructor(fireHydrantTypeService: FireHydrantTypeService) {
        super(fireHydrantTypeService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
