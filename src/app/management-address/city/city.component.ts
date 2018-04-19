import {Component, OnInit} from '@angular/core';

import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';
import {County} from '../shared/models/county.model';
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
export class CityComponent implements OnInit {
    cities: City[] = [];
    citiesType: CityType[] = [];
    counties: County[] = [];

    constructor(
        private cityService: CityService,
        private cityTypeService: CityTypeService,
        private countyService: CountyService
    ) { }

    ngOnInit() {
        this.loadCity();
        this.loadCityType();
        this.loadCounty();
    }

    getCityName(data) {
        const city = City.fromJSON(data);

        return city.getLocalization('fr');
    }

    getCityTypeName(data) {
        const cityType = CityType.fromJSON(data);

        return cityType.getLocalization('fr');
    }

    getCountyName(data) {
        const county = County.fromJSON(data);
console.log(data);
        return county.getLocalization('fr');
    }

    onInitNewRow(e) {
        e.data.emailAddress = '';
        e.data.isActive = true;
    }

    onRowValidating(e) {
        if (!e.newData.localizations) {
            e.isValid = false;
        }
    }

    onRowInserted(e) {
        this.cityService.save(e.data).subscribe(info => {
            this.loadCity();
        }, error => {
            this.loadCity();
        });
    }

    onRowUpdated(e) {
        this.cityService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.cityService.remove(e.key.id).subscribe();
    }

    private loadCity() {
        this.cityService.getAll().subscribe(data => this.cities = data);
    }

    private loadCityType() {
        this.cityTypeService.getAll().subscribe(data => this.citiesType = data);
    }

    private loadCounty() {
        this.countyService.getAll().subscribe(data => this.counties = data);
    }
}
