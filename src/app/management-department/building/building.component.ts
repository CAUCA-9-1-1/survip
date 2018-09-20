import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {alert} from 'devextreme/ui/dialog';
import Guid from 'devextreme/core/guid';

import config from '../../../assets/config/config.json';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {LaneService} from '../shared/services/lane.service';
import {UtilisationCodeService} from '../../management-system/shared/services/utilisation-code.service';
import {RiskLevelService} from '../../management-system/shared/services/risk-level.service';
import {GridWithOdataService} from '../../shared/classes/grid-with-odata-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {ODataService} from '../../shared/services/o-data.service';


@Component({
    selector: 'app-management-department-building',
    templateUrl: './building.component.html',
    styleUrls: ['./building.component.scss'],
    providers: [
        BuildingService,
        LaneService,
        CityService,
        UtilisationCodeService,
        RiskLevelService,
    ]
})
export class BuildingComponent extends GridWithOdataService implements OnInit {
    @Input()
    set parentBuilding(building: Building) {
        this.parent = building;
        this.isParent = (building ? false : true);

        if (this.isParent && this.selectedCity) {
            this.dataSource.filter(['idCity', '=', new Guid(this.selectedCity)]);
        } else {
            this.dataSource.filter(null);
        }

        this.dataSource.load();
    }

    public addingButton: any;
    public lanes: any = [];
    public lanesOfCity: any = [];
    public utilisationCodes: any = [];
    public riskLevels: any = [];
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

    private formFieldLane: any = null;
    private formFieldCity: any = null;
    private labels: any = {};

    public constructor(
        private laneService: LaneService,
        private cityService: CityService,
        private utilisationCode: UtilisationCodeService,
        private riskLevelService: RiskLevelService,
        private translateService: TranslateService,
    ) {
        super({
            expand: 'localizations',
            store: new ODataService({
                url: 'Building',
                key: 'id',
                keyType: 'Guid',
            }),
        });

        this.translateService.get([
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

    public onToolbarPreparing(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxButton',
            location: 'after',
            options: {
                icon: 'plus',
                width: 50,
                disabled: true,
                onInitialized: (ev) => {
                    this.addingButton = ev.component;
                },
                onClick: (ev) => {
                    e.component.addRow();
                },
            }
        });
        toolbarItems.unshift({
            widget: 'dxLookup',
            options: {
                displayExpr: 'name',
                valueExpr: 'id',
                width: 300,
                placeholder: this.labels['selectCity'],
                title: this.labels['selectCity'],
                closeOnOutsideClick: true,
                onInitialized: (ev) => {
                    this.formFieldCity = ev.component;
                },
                onValueChanged: (ev) => {
                    this.selectedCity = ev.value;
                    this.addingButton.option('disabled', false);
                    this.dataSource.filter(['idCity', '=', new Guid(ev.value)]);
                    this.dataSource.load();
                    this.loadLaneByCity(ev.value);
                }
            }
        });
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'idLane') {
            e.editorName = 'dxLookup';
            e.editorOptions.showClearButton = true;
            e.editorOptions.closeOnOutsideClick = true;
            e.editorOptions.onInitialized = (ev) => {
                this.formFieldLane = ev.component;
            };
            e.editorOptions.onValueChanged = (ev) => {
                if (ev.element.className.indexOf('dx-validator') === -1) {
                    if (ev.value) {
                        e.component.filter('idLane', '=', new Guid(ev.value));
                    } else {
                        e.component.clearFilter('idLane');
                    }
                } else {
                    e.setValue(ev.value);
                }
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
                id: new Guid(),
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
            e.data.id = new Guid();
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
            this.lanes = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.formFieldCity.option('value', (data[0] ? data[0].id : ''));
            this.formFieldCity.option('dataSource', {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            });
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

    private loadLaneByCity(idCity: string) {
        this.laneService.getAllOfCity(idCity).subscribe(data => {
            this.lanesOfCity = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
}