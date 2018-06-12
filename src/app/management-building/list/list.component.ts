import {Component, Input, OnInit} from '@angular/core';
import {alert} from 'devextreme/ui/dialog';

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
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-managementbuilding-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        BuildingService,
        LaneService,
        UtilisationCodeService,
        RiskLevelService,
    ]
})
export class ListComponent extends GridWithCrudService implements OnInit {
    @Input() isParent: boolean;
    @Input()
    set parentBuilding(building: Building) {
        this.parent = building;
        this.loadSource(this.parent.id);
    }

    labels: any = {};
    lanes: Lane[] = [];
    utilisationCodes: UtilisationCode[] = [];
    riskLevels: RiskLevel[] = [];
    selectedBuidling: string;
    parent: Building;
    popupVisible = {
        childBuildings: false,
        contacts: false,
        pnap: false,
        hazardousMaterials: false,
    };
    toolbarItems = [];

    constructor(
        buildingService: BuildingService,
        private laneService: LaneService,
        private utilisationCode: UtilisationCodeService,
        private riskLevelService: RiskLevelService,
        private translateServive: TranslateService,
    ) {
        super(buildingService);

        this.translateServive.get([
            'close', 'save', 'youNeedToSaveYourNewItem'
        ]).subscribe(labels => {
            this.labels = labels;

            this.toolbarItems = [{
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'close',
                    text: this.labels['close'],
                    onClick: () => {
                        this.popupVisible['childBuildings'] = false;
                        this.popupVisible['contacts'] = false;
                        this.popupVisible['pnap'] = false;
                        this.popupVisible['hazardousMaterials'] = false;
                    }
                }
            }];
        });
    }

    ngOnInit() {
        if (this.isParent) {
            this.loadSource();
        }

        this.loadLane();
        this.loadUtilisationCode();
        this.loadRiskLevel();
    }

    getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        const building = new Building();

        e.data = Object.assign(this.parent || building, {
            localizations: null,
            buildingValue: building.buildingValue,
            yearOfConstruction: building.yearOfConstruction,
            isParent: this.isParent,
        });

        this.selectedBuidling = null;
    }

    onEditingStart(e) {
        this.selectedBuidling = e.data;
    }

    uploadPicture(e) {
        console.log(e);
    }

    showPopup(popupName: string) {
        if (!this.selectedBuidling) {
            alert(this.labels['youNeedToSaveYourNewItem'], this.labels['save']);

            return null;
        }

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
