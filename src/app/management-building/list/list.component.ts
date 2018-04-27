import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {Lane} from '../../management-address/shared/models/lane.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
import {RiskLevel} from '../shared/models/risk-level.model';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-managementbuilding-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.styl'],
    providers: [
        BuildingService,
        LaneService,
        UtilisationCodeService,
        RiskLevelService,
    ]
})
export class ListComponent extends GridWithCrudService implements OnInit {
    buildings: Building[] = [];
    lanes: Lane[] = [];
    utilisationCodes: UtilisationCode[] = [];
    riskLevels: RiskLevel[] = [];

    constructor(
        buildingService: BuildingService,
        private laneService: LaneService,
        private utilisationCode: UtilisationCodeService,
        private riskLevelService: RiskLevelService
    ) {
        super(buildingService);
    }

    ngOnInit() {
        this.loadSource();
        this.loadLane();
        this.loadUtilisationCode();
        this.loadRiskLevel();
    }

    getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization(environment.locale.use);
    }

    getLaneName(data) {
        const lane = Lane.fromJSON(data);

        return lane.getLocalization(environment.locale.use);
    }

    public onInitNewRow(e) {
        e.data.vacantLand = false;
        e.data.isParent = true;
        e.data.isActive = true;
    }

    private loadLane() {
        this.laneService.getAll().subscribe(data => this.lanes = data);
    }

    private loadUtilisationCode() {
        this.utilisationCode.getAll().subscribe(data => this.utilisationCodes = data);
    }

    private loadRiskLevel() {
        this.riskLevelService.getAll().subscribe(data => this.riskLevels = data);
    }
}
