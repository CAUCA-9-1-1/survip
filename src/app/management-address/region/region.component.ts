import {Component, OnInit} from '@angular/core';

import {Region} from '../shared/models/region.model';
import {RegionService} from '../shared/services/region.service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';


@Component({
    selector: 'app-managementaddress-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.scss'],
    providers: [
        RegionService,
        StateService,
    ]
})
export class RegionComponent implements OnInit {
    regions: Region[] = [];
    states: State[] = [];

    constructor(private regionService: RegionService, private stateService: StateService) { }

    public ngOnInit() {
        this.loadRegion();
        this.loadState();
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
        this.regionService.save(e.data).subscribe(info => {
            this.loadRegion();
        });
    }

    onRowUpdated(e) {
        this.regionService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.regionService.remove(e.key.id).subscribe();
    }

    private loadRegion() {
        this.regionService.getAll().subscribe(data => this.regions = data);
    }

    private loadState() {
        this.stateService.getAll().subscribe(data => this.states = data);
    }
}
