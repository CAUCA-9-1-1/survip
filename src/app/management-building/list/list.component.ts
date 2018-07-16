import {Component, Input, OnInit} from '@angular/core';
import {alert} from 'devextreme/ui/dialog';

import {environment} from '../../../environments/environment';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
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
    @Input()
    set parentBuilding(building: Building) {
        console.log('parent', building);
        this.parent = building;
        this.isParent = (building ? false : true);
        this.loadSource(this.parent ? this.parent.id : undefined);
    }

    labels: any = {};
    lanes: any = {};
    utilisationCodes: any = {};
    riskLevels: any = {};
    selectedBuidling: string;
    parent: Building;
    isParent = true;
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

    setModel(data: any) {
        return Building.fromJSON(data);
    }

    ngOnInit() {
        this.loadLane();
        this.loadUtilisationCode();
        this.loadRiskLevel();
    }

    getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization(environment.locale.use);
    }

    onEditorPreparing(e) {
        if (e.dataField === 'idLane' || e.dataField === 'idUtilisationCode') {
            e.editorName = 'dxLookup';
        }
    }

    onInitNewRow(e) {
        const building = new Building();

        this.selectedBuidling = null;

        if (this.parent) {
            e.data = Object.assign(this.parent, {
                id: undefined,
                localizations: undefined,
                createdOn: undefined,
                idPicture: undefined,
                idParentBuilding: this.parent.id,
                buildingValue: building.buildingValue,
                yearOfConstruction: building.yearOfConstruction,
                childType: 1,
            });
        } else {
            e.data = Object.assign({}, building);
        }
    }

    onEditingStart(e) {
        this.selectedBuidling = e.data;
    }

    showPopup(popupName: string) {
        if (!this.selectedBuidling) {
            alert(this.labels['youNeedToSaveYourNewItem'], this.labels['save']);

            return null;
        }

        this.popupVisible[popupName] = true;
    }

    private loadLane() {
        this.laneService.localized().subscribe(data => {
            this.lanes = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadUtilisationCode() {
        this.utilisationCode.localized().subscribe(data => {
            this.utilisationCodes = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadRiskLevel() {
        this.riskLevelService.localized().subscribe(data => {
            this.riskLevels = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
}
