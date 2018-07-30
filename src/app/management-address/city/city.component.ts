import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {CityTypeService} from '../shared/services/citytype.service';
import {CountyService} from '../shared/services/county.service';


@Component({
    selector: 'app-managementaddress-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss'],
    providers: [
        CityService,
        CityTypeService,
        CountyService,
    ]
})
export class CityComponent extends GridWithCrudService implements OnInit {
    citiesType: any = {};
    counties: any = {};

    constructor(
        cityService: CityService,
        private cityTypeService: CityTypeService,
        private countyService: CountyService
    ) {
        super(cityService);
    }

    setModel(data: any) {
        return City.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCityType();
        this.loadCounty();
    }

    getCityName(data) {
        const city = City.fromJSON(data);

        return city.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.emailAddress = '';
        e.data.isActive = true;
    }

    private loadCityType() {
        this.cityTypeService.localized().subscribe(data => {
            this.citiesType = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadCounty() {
        this.countyService.localized().subscribe(data => {
            this.counties = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
}
