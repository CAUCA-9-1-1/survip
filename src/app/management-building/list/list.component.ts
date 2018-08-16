import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {alert} from 'devextreme/ui/dialog';
import DataSource from 'devextreme/data/data_source';

import config from '../../../assets/config/config.json';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {ODataService} from '../../shared/services/o-data.service';


@Component({
    selector: 'app-managementbuilding-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        BuildingService,
        LaneService,
        CityService,
        UtilisationCodeService,
        RiskLevelService,
    ]
})
export class ListComponent extends GridWithCrudService implements OnInit {
    @Input()
    set parentBuilding(building: Building) {
        this.parent = building;
        this.isParent = (building ? false : true);

        if (this.selectedCity) {
            this.dataSource.filter(['idCity', '=', this.selectedCity]);
        } else {
            this.dataSource.clearFilter();
        }
    }

    public activeAdding = false;
    public dataSource: any;
    public labels: any = {};
    public cities = {
        store: [],
        select: ['id', 'name'],
        sort: ['name'],
    };
    public lanes = {
        store: [],
        select: ['id', 'name'],
        sort: ['name'],
    };
    public lanesOfCity = {
        store: [],
        select: ['id', 'name'],
        sort: ['name'],
    };
    public utilisationCodes = {
        store: [],
        select: ['id', 'name'],
        sort: ['name'],
    };
    public riskLevels = {
        store: [],
        select: ['id', 'name'],
        sort: ['name'],
    };
    public selectedCity: string;
    public selectedBuidling: string;
    public parent: Building;
    public isParent = true;
    public popupVisible = {
        childBuildings: false,
        contacts: false,
        pnap: false,
        hazardousMaterials: false,
    };
    public toolbarItems = [];
    public formFieldLane: any = null;

    public constructor(
        buildingService: BuildingService,
        private laneService: LaneService,
        private cityService: CityService,
        private utilisationCode: UtilisationCodeService,
        private riskLevelService: RiskLevelService,
        private translateServive: TranslateService,
    ) {
        super(buildingService);

        this.dataSource = new DataSource({
            store: new ODataService({
                url: 'Building',
                key: 'idBuilding',
                keyType: 'string',
            }),
        });

        this.translateServive.get([
            'close', 'save', 'youNeedToSaveYourNewItem', 'selectCity'
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

    public setModel(data: any) {
        return Building.fromJSON(data);
    }

    public ngOnInit() {
        this.loadCity();
        this.loadLane();
        this.loadUtilisationCode();
        this.loadRiskLevel();
    }

    public getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization(config.locale);
    }

    public onInitialized(e) {
        const options = e.component.option('editing');

        if (options.popup) {
            options.form.validationGroup = this.validationGroup;
            options.form.onInitialized = (ev) => {
                this.form = ev.component;
            };
            options.popup.onHiding = (ev) => {
                this.dataSource.reload();
            };

            e.component.option('editing', options);
        }
    }

    public onToolbarPreparing(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxLookup',
            options: {
                displayExpr: 'name',
                valueExpr: 'id',
                width: 300,
                placeholder: this.labels['selectCity'],
                onOpened: (ev) => {
                    ev.component.option('dataSource', this.cities);
                },
                onValueChanged: (ev) => {
                    this.activeAdding = true;
                    this.selectedCity = ev.value;
                    this.dataSource.filter(['idCity', '=', ev.value]);
                    this.loadLaneByCity(ev.value);
                }
            }
        });
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'idLane') {
            e.editorName = 'dxLookup';
            e.editorOptions.closeOnOutsideClick = true;
            e.editorOptions.onInitialized = (ev) => {
                this.formFieldLane = ev.component;
            };
            e.editorOptions.onOpened = (ev) => {
                ev.component.option('dataSource', this.lanesOfCity);
            };
        } else if (e.dataField === 'idUtilisationCode') {
            e.editorName = 'dxLookup';
            e.editorOptions.closeOnOutsideClick = true;
        }
    }

    public onInitNewRow(e) {
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
            e.data.idCity = this.selectedCity;
        }
    }

    public onEditingStart(e) {
        this.selectedBuidling = e.data;
    }

    public showPopup(popupName: string) {
        if (!this.selectedBuidling) {
            alert(this.labels['youNeedToSaveYourNewItem'], this.labels['save']);

            return null;
        }

        this.popupVisible[popupName] = true;
    }

    private loadLane() {
        this.laneService.localized().subscribe(data => {
            this.lanes.store = data;
        });
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.cities.store = data;
        });
    }

    private loadUtilisationCode() {
        this.utilisationCode.localized().subscribe(data => {
            this.utilisationCodes.store = data;
        });
    }

    private loadRiskLevel() {
        this.riskLevelService.localized().subscribe(data => {
            this.riskLevels.store = data;
        });
    }

    private loadLaneByCity(idCity: string) {
        this.laneService.getAllOfCity(idCity).subscribe(data => {
            this.lanesOfCity.store = data;
        });
    }
}
