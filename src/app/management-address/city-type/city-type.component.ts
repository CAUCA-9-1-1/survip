import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementaddress-citytype',
    templateUrl: './city-type.component.html',
    styleUrls: ['./city-type.component.scss'],
    providers: [CityTypeService]
})
export class CityTypeComponent extends GridWithCrudService implements OnInit {

    constructor(cityTypeService: CityTypeService) {
        super(cityTypeService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCityTypeName(data) {
        const cityType = CityType.fromJSON(data);

        return cityType.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
