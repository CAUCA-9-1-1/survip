import {Component, OnInit} from '@angular/core';

import {HazardousMaterial} from '../shared/models/hazardous-material.model';
import {HazardousMaterialService} from '../shared/services/hazardous-material.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-managementbuilding-hazardousmaterial',
    templateUrl: './hazardous-material.component.html',
    styleUrls: ['./hazardous-material.component.styl'],
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
