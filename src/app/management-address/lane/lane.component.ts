import {Component, OnInit} from '@angular/core';

import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';
import {LaneGenericCode} from '../shared/models/lane-generic-code.model';
import {LanePublicCode} from '../shared/models/lane-public-code.model';
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
export class LaneComponent implements OnInit {
    lanes: Lane[] = [];
    cities: City[] = [];
    publicCodes: LanePublicCode[] = [];
    genericCodes: LaneGenericCode[] = [];
    validationForName = [{
        type: 'required'
    }];

    constructor(
        private laneService: LaneService,
        private cityService: CityService,
        private publicCode: LanePublicCodeService,
        private genericCode: LaneGenericCodeService
    ) { }

    ngOnInit() {
        this.loadLane();
        this.loadCity();
        this.loadPublicCode();
        this.loadGenericCode();
    }

    getLaneName(data) {
        const lane = Lane.fromJSON(data);

        return lane.getLocalization('fr');
    }

    getCityName(data) {
        const city = City.fromJSON(data);

        return city.getLocalization('fr');
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
        this.laneService.save(e.data).subscribe(info => {
            this.loadLane();
        });
    }

    onRowUpdated(e) {
        this.laneService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.laneService.remove(e.key.id).subscribe();
    }

    private loadLane() {
        this.laneService.getAll().subscribe(data => this.lanes = data);
    }

    private loadCity() {
        this.cityService.getAll().subscribe(data => this.cities = data);
    }

    private loadPublicCode() {
        this.publicCode.getAll().subscribe(data => this.publicCodes = data);
    }

    private loadGenericCode() {
        this.genericCode.getAll().subscribe(data => this.genericCodes = data);
    }
}
