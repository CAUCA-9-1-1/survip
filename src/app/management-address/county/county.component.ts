import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';
import {Region} from '../shared/models/region.model';
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
    states: State[] = [];
    regions: Region[] = [];

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

    getRegionName(data) {
        const region = Region.fromJSON(data);

        return region.getLocalization(environment.locale.use);
    }

    getStateName(data) {
        const state = State.fromJSON(data);

        return state.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadState() {
        this.stateService.getAll().subscribe(data => this.states = data);
    }

    private loadRegion() {
        this.regionService.getAll().subscribe(data => this.regions = data);
    }
}
