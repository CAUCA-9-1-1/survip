import {Component, OnInit} from '@angular/core';

import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';
import {County} from '../shared/models/county.model';

@Component({
    selector: 'app-managementaddress-citytype',
    templateUrl: './city-type.component.html',
    styleUrls: ['./city-type.component.scss'],
    providers: [CityTypeService]
})
export class CityTypeComponent implements OnInit {
    cityType: CityType[] = [];

    constructor(private cityTypeService: CityTypeService) { }

    ngOnInit() {
        this.loadCityType();
    }

    getCityTypeName(data) {
        const cityType = CityType.fromJSON(data);

        return cityType.getLocalization('fr');
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    onRowValidating(e) {
        if (!e.newData.localizations) {
            e.isValid = false;
        }
    }

    onRowInserted(e) {
        this.cityTypeService.save(e.data).subscribe(info => {
            this.loadCityType();
        });
    }

    onRowUpdated(e) {
        this.cityTypeService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.cityTypeService.remove(e.key.id).subscribe();
    }

    private loadCityType() {
        this.cityTypeService.getAll().subscribe(data => this.cityType = data);
    }
}
