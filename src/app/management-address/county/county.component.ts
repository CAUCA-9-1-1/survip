import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';
import {StateService} from '../shared/services/state.service';
import {RegionService} from '../shared/services/region.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-address-county',
    templateUrl: './county.component.html',
    styleUrls: ['./county.component.scss'],
    providers: [
        CountyService,
        StateService,
        RegionService,
    ]
    })
export class CountyComponent extends GridWithCrudService implements OnInit {
    regions: any = {};
    public readOnlyImported = !this.stateService.readOnlyImported;

    constructor(
        countyService: CountyService,
        private stateService: StateService,
        private regionService: RegionService,
        protected translateService: TranslateService
    ) {
        super(translateService, countyService);
    }

    setModel(data: any) {
        return County.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadRegion();
    }

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadRegion() {
        this.regionService.localized().subscribe(data => {
            this.regions = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
}
