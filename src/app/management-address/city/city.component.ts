import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {CityTypeService} from '../../management-type-system/shared/services/citytype.service';
import {CountyService} from '../shared/services/county.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-address-city',
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

    public readOnlyImported = !this.cityTypeService.readOnlyImported;

    constructor(
        cityService: CityService,
        private cityTypeService: CityTypeService,
        private countyService: CountyService,
        protected translateService: TranslateService
    ) {
        super(translateService, cityService);
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

    public onEditorPreparing(e) {
        if (e.row != null && e.row.data != null) {
            if (e.row.data.idExtern != null) {
                e.editorOptions.readOnly = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.readOnly;
            } else {
                this.readOnly = false;
            }
        }
    }
}
