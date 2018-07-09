import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {LaneGenericCode} from '../shared/models/lane-generic-code.model';
import {LanePublicCode} from '../shared/models/lane-public-code.model';
import {LaneGenericCodeService} from '../shared/services/lane-generic-code.service';
import {LanePublicCodeService} from '../shared/services/lane-public-code.service';
import DataSource from 'devextreme/data/data_source';


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
    cities: City[] = [];
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

    getCityName(data) {
        const city = City.fromJSON(data);

        return city.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadCity() {
        this.cityService.getAll().subscribe(data => this.cities = data);
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
