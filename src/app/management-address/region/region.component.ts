import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Region} from '../shared/models/region.model';
import {RegionService} from '../shared/services/region.service';
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
export class RegionComponent extends GridWithCrudService implements OnInit {
    states: any = {};

    constructor(regionService: RegionService, private stateService: StateService) {
        super(regionService);
    }

    setModel(data: any) {
        return Region.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadState();
    }

    getRegionName(data) {
        const region = Region.fromJSON(data);

        return region.getLocalization(environment.locale.use);
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
}
