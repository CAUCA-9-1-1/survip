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
    private labels: any = {};

    constructor(
        cityService: CityService,
        private cityTypeService: CityTypeService,
        private countyService: CountyService,
        private translateService: TranslateService
    ) {
        super(cityService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
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

    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.disabled = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.disabled;
                this.setPopupName(e, this.labels['cannotModifyExternalData']);
            } else {
                this.readOnly = false;
            }
        }
    }
}
