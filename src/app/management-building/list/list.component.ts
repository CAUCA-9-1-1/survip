import {Component, Input, OnInit} from '@angular/core';

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
    @Input() isParent: boolean;
    @Input() idParentBuilding: string;

    lanes: Lane[] = [];
    utilisationCodes: UtilisationCode[] = [];
    riskLevels: RiskLevel[] = [];
    popupVisible = {
        childBuildings: false,
        waterSupply: false,
    };

    constructor(
        buildingService: BuildingService,
        private laneService: LaneService,
        private utilisationCode: UtilisationCodeService,
        private riskLevelService: RiskLevelService
    ) {
        super(buildingService);
    }

    ngOnInit() {
        console.log(this.idParentBuilding);

        this.loadSource();
        this.loadLane();
        this.loadUtilisationCode();
        this.loadRiskLevel();
    }

    getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.vacantLand = false;
        e.data.isParent = true;
        e.data.isActive = true;
    }

    showPopup(popupName: string) {
        this.popupVisible[popupName] = true;
    }

    private loadLane() {
        this.laneService.localized().subscribe(data => this.lanes = data);
    }

    private loadUtilisationCode() {
        this.utilisationCode.localized().subscribe(data => this.utilisationCodes = data);
    }

    private loadRiskLevel() {
        this.riskLevelService.localized().subscribe(data => this.riskLevels = data);
    }
}
