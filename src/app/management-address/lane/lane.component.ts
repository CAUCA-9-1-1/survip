import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';
import {CityService} from '../shared/services/city.service';
import {LaneGenericCodeService} from '../shared/services/lane-generic-code.service';
import {LanePublicCodeService} from '../shared/services/lane-public-code.service';


@Component({
    selector: 'app-managementaddress-lane',
    templateUrl: './lane.component.html',
    styleUrls: ['./lane.component.scss'],
    providers: [
        LaneService,
        CityService,
        LaneGenericCodeService,
        LanePublicCodeService,
    ]
})
export class LaneComponent extends GridWithCrudService implements OnInit {
    cities: any = {};
    publicCodes: any = {};
    genericCodes: any = {};

    constructor(
        laneService: LaneService,
        private cityService: CityService,
        private publicCode: LanePublicCodeService,
        private genericCode: LaneGenericCodeService
    ) {
        super(laneService);
    }

    setModel(data: any) {
        return Lane.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCity();
        this.loadPublicCode();
        this.loadGenericCode();
    }

    getLaneName(data) {
        const lane = Lane.fromJSON(data);

        return lane.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.cities = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadPublicCode() {
        this.publicCode.getAll().subscribe(data => {
            this.publicCodes = {
                store: data,
                select: ['id', 'description'],
                sort: ['description'],
            };
        });
    }

    private loadGenericCode() {
        this.genericCode.getAll().subscribe(data => {
            this.genericCodes = {
                store: data,
                select: ['id', 'description'],
                sort: ['description'],
            };
        });
    }
}
