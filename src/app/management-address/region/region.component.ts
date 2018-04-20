import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

import {Region} from '../shared/models/region.model';
import {RegionService} from '../shared/services/region.service';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementaddress-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.scss'],
    providers: [
        RegionService,
        StateService,
    ]
})
export class RegionComponent extends GridWithCrudService implements OnInit {
    states: State[] = [];

    constructor(regionService: RegionService, private stateService: StateService) {
        super(regionService);
    }

    public ngOnInit() {
        this.loadSource();
        this.loadState();
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
}
