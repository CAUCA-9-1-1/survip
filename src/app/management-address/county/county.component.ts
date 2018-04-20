import {Component, OnInit} from '@angular/core';

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
export class CountyComponent implements OnInit {
    counties: County[] = [];
    states: State[] = [];
    regions: Region[] = [];

    constructor(
        private countyService: CountyService,
        private stateService: StateService,
        private regionService: RegionService
    ) { }

    ngOnInit() {
        this.loadCounty();
        this.loadState();
        this.loadRegion();
    }

    getCountyName(data) {
        const county = County.fromJSON(data);

        return county.getLocalization('fr');
    }

    getRegionName(data) {
        const region = Region.fromJSON(data);

        return region.getLocalization('fr');
    }

    getStateName(data) {
        const state = State.fromJSON(data);

        return state.getLocalization('fr');
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
        this.countyService.save(e.data).subscribe(info => {
            this.loadCounty();
        });
    }

    onRowUpdated(e) {
        this.countyService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.countyService.remove(e.key.id).subscribe();
    }

    private loadCounty() {
        this.countyService.getAll().subscribe(data => this.counties = data);
    }

    private loadState() {
        this.stateService.getAll().subscribe(data => this.states = data);
    }

    private loadRegion() {
        this.regionService.getAll().subscribe(data => this.regions = data);
    }
}
