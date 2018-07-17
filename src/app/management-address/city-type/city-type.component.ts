import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';


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

    setModel(data: any) {
        return CityType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCityTypeName(data) {
        const cityType = CityType.fromJSON(data);

        return cityType.getLocalization(config.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
