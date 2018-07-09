import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';
import {StateService} from '../shared/services/state.service';
import {RegionService} from '../shared/services/region.service';


@Component({
    selector: 'app-managementaddress-county',
    templateUrl: './county.component.html',
    styleUrls: ['./county.component.scss'],
    providers: [
        CountyService,
        StateService,
        RegionService,
    ]
    })
export class CountyComponent extends GridWithCrudService implements OnInit {
    states: any = {};
    regions: any = {};

    constructor(
        countyService: CountyService,
        private stateService: StateService,
        private regionService: RegionService
    ) {
        super(countyService);
    }

    setModel(data: any) {
        return County.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadState();
        this.loadRegion();
    }

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadState() {
        this.stateService.localized().subscribe(data => {
            this.states = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
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
