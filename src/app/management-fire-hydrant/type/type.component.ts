import { Component, OnInit } from '@angular/core';

import config from '../../../assets/config/config.json';
import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementfirehydrant-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss'],
    providers: [FireHydrantTypeService]
})
export class TypeComponent extends GridWithCrudService implements OnInit {

    constructor(fireHydrantTypeService: FireHydrantTypeService) {
        super(fireHydrantTypeService);
    }

    setModel(data: any) {
        return FireHydrantType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(config.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
