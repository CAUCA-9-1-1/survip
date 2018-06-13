import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {HazardousMaterial} from '../shared/models/hazardous-material.model';
import {HazardousMaterialService} from '../shared/services/hazardous-material.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementbuilding-hazardousmaterial',
    templateUrl: './hazardous-material.component.html',
    styleUrls: ['./hazardous-material.component.scss'],
    providers: [
        HazardousMaterialService,
    ]
})
export class HazardousMaterialComponent extends GridWithCrudService implements OnInit {

    constructor(
        hazardousMaterialService: HazardousMaterialService
    ) {
        super(hazardousMaterialService);
    }

    setModel(data: any) {
        return HazardousMaterial.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getMaterialName(data) {
        const material = HazardousMaterial.fromJSON(data);

        return material.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data = Object.assign(new HazardousMaterial(), {});
    }
}
