import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


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
    citiesType: CityType[] = [];
    counties: County[] = [];

    constructor(
        cityService: CityService,
        private cityTypeService: CityTypeService,
        private countyService: CountyService
    ) {
        super(cityService);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCityType();
        this.loadCounty();
    }

    getCityName(data) {
        const city = City.fromJSON(data);

        return city.getLocalization(environment.locale.use);
    }

    getCityTypeName(data) {
        const cityType = CityType.fromJSON(data);

        return cityType.getLocalization(environment.locale.use);
    }

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.emailAddress = '';
        e.data.isActive = true;
    }

    private loadCityType() {
        this.cityTypeService.getAll().subscribe(data => this.citiesType = data);
    }

    private loadCounty() {
        this.countyService.getAll().subscribe(data => this.counties = data);
    }
}
