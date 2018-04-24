import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

import {FireHydrantConnectionType} from '../shared/models/fire-hydrant-connection-type.model';
import {FireHydrantConnectionTypeService} from '../shared/services/fire-hydrant-connection-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementfirehydrant-connectiontype',
    templateUrl: './connection-type.component.html',
    styleUrls: ['./connection-type.component.styl'],
    providers: [FireHydrantConnectionTypeService]
})
export class ConnectionTypeComponent extends GridWithCrudService implements OnInit {

    constructor(connectionTypeService: FireHydrantConnectionTypeService) {
        super(connectionTypeService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = FireHydrantConnectionType.fromJSON(data);

        return type.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
