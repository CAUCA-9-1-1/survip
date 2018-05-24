import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {MatDialog, MatSnackBar} from '@angular/material';

import {environment} from '../../environments/environment';
import {InspectionService} from './shared/services/inspection.service';
import {LaneService} from '../management-address/shared/services/lane.service';
import {Lane} from '../management-address/shared/models/lane.model';
import {RiskLevelService} from '../management-building/shared/services/risk-level.service';
import {RiskLevel} from '../management-building/shared/models/risk-level.model';
import {UtilisationCode} from '../management-building/shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../management-building/shared/services/utilisation-code.service';
import {InspectionForList} from './shared/models/inspection-for-list.model';
import {City} from '../management-address/shared/models/city.model';
import {CityService} from '../management-address/shared/services/city.service';
import {InspectionBatchService} from '../inspection-batch/shared/services/inspection-batch.service';
import {InspectionBatch} from '../inspection-batch/shared/models/inspection-batch.model';
import {AskBatchDescriptionComponent} from './ask-batch-description/ask-batch-description.component';
import {WebuserForWeb} from '../management-access/shared/models/webuser-for-web.model';
import {WebuserService} from '../management-access/shared/services/webuser.service';
import {PictureService} from '../shared/services/picture.service';


@Component({
    selector: 'app-dashboard-inspection',
    templateUrl: './inspection-dashboard.component.html',
    styleUrls: ['./inspection-dashboard.component.scss'],
    providers: [
        InspectionService,
        LaneService,
        CityService,
        RiskLevelService,
        UtilisationCodeService,
        InspectionBatchService,
        PictureService,
        WebuserService,
    ]
})
export class InspectionDashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    dataSource: InspectionForList[];
    webusers: WebuserForWeb[] = [];
    lanes: Lane[] = [];
    cities: City[] = [];
    riskLevels: RiskLevel[] = [];
    utilisationCodes: UtilisationCode[] = [];
    labels = {};
    selectedMode = 'mode1';
    angularIsLoaded = false;
    everythingIsLoaded = false;

    constructor(
        private inspectionService: InspectionService,
        private webuserService: WebuserService,
        private laneService: LaneService,
        private cityService: CityService,
        private riskLevelService: RiskLevelService,
        private utilisationCodeService: UtilisationCodeService,
        private translateService: TranslateService,
        private notification: MatSnackBar,
        private batchService: InspectionBatchService,
        private pictureService: PictureService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.loadRiskLevel();
        this.loadCities();
        this.loadLanes();
        this.loadWebusers();
        this.loadUtilisationCode();

        this.translateService.get([
            'riskLevel', 'address', 'transversal', 'city', 'postalCode', 'batch', 'status', 'note', 'anomaly',
            'lastInspection', 'inspectionType', 'contact', 'owner', 'picture', 'buildingValue', 'details',
            'matricule', 'numberOfAppartment', 'numberOfBuilding', 'numberOfFloor', 'utilisationCode', 'see',
            'vacantLand', 'yearOfConstruction', 'webuserAssignedTo', 'createBatch', 'needMinimum1Building',
            'approve', 'todo', 'started', 'absent', 'waitingApprobation', 'approved', 'refused', 'canceled'
        ]).subscribe(labels => {
            this.labels = labels;
            this.checkLoadedElement();
        });
    }

    ngAfterViewInit() {
        this.angularIsLoaded = true;
        this.checkLoadedElement();
    }

    changeMode(mode) {
        this.selectedMode = mode;
        this.checkLoadedElement();
    }

    showBatch(field) {
        if (field.data && field.data.items.length) {
            this.router.navigate(['/inspection/batch', field.data.items[0].idBatch]);
        }
    }

    showInspection(field) {
        if (field.data) {
            this.router.navigate(['/inspection/dashboard', field.data.id]);
        }
    }

    private checkLoadedElement(): boolean {
        if (
            this.angularIsLoaded && this.labels !== {} &&
            this.riskLevels.length && this.lanes.length &&
            this.cities.length && this.utilisationCodes.length &&
            this.webusers.length
        ) {
            this.setDatagrid();
            this.loadData();
            this.everythingIsLoaded = true;

            return true;
        }

        return false;
    }

    private createBatch(e) {
        const buildings = [];

        this.dataGrid.instance.getSelectedRowsData().forEach(rows => {
            buildings.push(rows.idBuilding);
        });

        if (buildings.length === 0) {
            return this.notification.open( this.labels['needMinimum1Building'], '', {
                duration: 5000,
            });
        }

        this.askBatchDescription(buildings);
    }

    private askBatchDescription(buildings: string[]): void {
        const dialogRef = this.dialog.open(AskBatchDescriptionComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            const batch = InspectionBatch.fromJSON({
                description: result.description,
                idWebuserCreatedBy: localStorage.getItem('currentWebuser'),
                isActive: true,
                isReadyForInspection: false,
                inspections: [],
            });

            buildings.forEach(building => {
                batch.inspections.push({
                    idBuilding: building,
                    idWebuserCreatedBy: localStorage.getItem('currentWebuser'),
                    isActive: true,
                });
            });

            this.batchService.save(batch).subscribe((data) => {
                this.router.navigate(['inspection/batch', data.id]);
            });
        });
    }

    private setDatagrid() {
        const columns = this.getColumns();

        this.dataGrid.instance.option({
            filterRow: {
                visible: true,
            },
            searchPanel: {
                visible: true,
                width: (screen.width / 2),
            },
            columns: columns,
            columnChooser: {
                enabled: true,
                mode: 'select',
                height: (screen.height / 1.5),
                width: (screen.width / 3),
            },
            onColumnsChanging: (e) => {
                const visible = [];

                for (let i = 0, j = e.component.columnCount(); i < j; i++) {
                    visible.push(e.component.columnOption(i, 'visible'));
                }

                localStorage.setItem('column-visible-' + this.selectedMode, JSON.stringify(visible));
            },
            selection: {
                mode: 'multiple'
            },
            onToolbarPreparing: (e) => this.customizeToolbar(e)
        });
    }

    private customizeToolbar(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                text: this.labels['createBatch'],
                icon: 'group',
                disabled: (this.selectedMode === 'mode1' || this.selectedMode === 'mode2' ? true : false),
                onClick: (ev) => this.createBatch(ev)
            },
            location: 'after',
        });
    }

    private getDefaultColumnVisible() {
        const visible = [
            false, true, true, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false
        ];

        switch (this.selectedMode) {
            case 'mode1':
                visible[6] = true;
                visible[7] = true;
                visible[8] = true;
                break;
            case 'mode2':
                visible[0] = true;
                visible[6] = true;
                visible[7] = true;
                visible[8] = true;
                visible[9] = true;
                visible[10] = true;
                break;
            case 'mode3':
                visible[9] = true;
                visible[10] = true;
                visible[11] = true;
                break;
            case 'mode4':
                visible[4] = true;
                break;
            default:
                break;
        }

        return visible;
    }

    private getColumns(): any[] {
        const visible = JSON.parse(localStorage.getItem('column-visible-' + this.selectedMode)) || this.getDefaultColumnVisible();

        return [{
            caption: this.labels['approve'],
            visible: visible[0],
            cellTemplate: 'approveInspection',
        }, {
            dataField: 'idRiskLevel',
            caption: this.labels['riskLevel'],
            lookup: {
                dataSource: this.riskLevels,
                valueExpr: 'id',
                displayExpr: (data) => {
                    return data.name;
                }
            },
            visible: visible[1],
        }, {
            dataField: 'address',
            caption: this.labels['address'],
            visible: visible[2],
        }, {
            dataField: 'idLaneTransversal',
            caption: this.labels['transversal'],
            lookup: {
                dataSource: this.lanes,
                valueExpr: 'id',
                displayExpr: (data) => {
                    const lane = Lane.fromJSON(data);

                    return lane.getLocalization(environment.locale.use);
                }
            },
            visible: visible[3],
        }, {
            dataField: 'idCity',
            caption: this.labels['city'],
            visible: visible[4],
            lookup: {
                dataSource: this.cities,
                valueExpr: 'id',
                displayExpr: (data) => {
                    const city = City.fromJSON(data);

                    return city.getLocalization(environment.locale.use);
                }
            },
        }, {
            dataField: 'postalCode',
            caption: this.labels['postalCode'],
            visible: visible[5],
        }, {
            dataField: 'idWebuserAssignedTo',
            caption: this.labels['webuserAssignedTo'],
            lookup: {
                dataSource: this.webusers,
                displayExpr: 'name',
                valueExpr: 'id',
            },
            visible: visible[6],
        }, {
            dataField: 'batchDescription',
            caption: this.labels['batch'],
            visible: visible[7],
            groupIndex: (this.selectedMode === 'mode1' || this.selectedMode === 'mode2' ? 0 : null),
            groupCellTemplate: 'groupBatch',
        }, {
            dataField: 'inspectionStatus',
            caption: this.labels['status'],
            visible: visible[8],
            lookup: {
                displayExpr: 'name',
                valueExpr: 'id',
                dataSource: [{
                    id: 0,
                    name: this.labels['todo']
                }, {
                    id: 1,
                    name: this.labels['started']
                }, {
                    id: 2,
                    name: this.labels['waitingApprobation']
                }, {
                    id: 3,
                    name: this.labels['approved']
                }, {
                    id: 4,
                    name: this.labels['refused']
                }, {
                    id: 5,
                    name: this.labels['canceled']
                }]
            }
        }, {
            dataField: 'hasAnomaly',
            caption: this.labels['anomaly'],
            dataType: 'boolean',
            visible: visible[9],
        }, {
            dataField: 'lastInspectionOn',
            caption: this.labels['lastInspection'],
            dataType: 'date',
            visible: visible[10],
        }, {
            dataField: 'contact',
            caption: this.labels['contact'],
            visible: visible[11],
        }, {
            dataField: 'owner',
            caption: this.labels['owner'],
            visible: visible[12],
        }, {
            dataField: 'idUtilisationCode',
            caption: this.labels['utilisationCode'],
            lookup: {
                dataSource: this.utilisationCodes,
                valueExpr: 'id',
                displayExpr: (data) => {
                    const code = UtilisationCode.fromJSON(data);

                    return code.getLocalization(environment.locale.use, 'description');
                }
            },
            visible: visible[13],
        }, {
            dataField: 'idPicture',
            caption: this.labels['picture'],
            visible: visible[14],
            cellTemplate: (container, options) => this.showPicture(container, options),
        }, {
            dataField: 'buildingValue',
            caption: this.labels['buildingValue'],
            visible: visible[15],
        }, {
            dataField: 'matricule',
            caption: this.labels['matricule'],
            visible: visible[16],
        }, {
            dataField: 'numberOfAppartment',
            caption: this.labels['numberOfAppartment'],
            visible: visible[17],
        }, {
            dataField: 'numberOfBuilding',
            caption: this.labels['numberOfBuilding'],
            visible: visible[18],
        }, {
            dataField: 'numberOfFloor',
            caption: this.labels['numberOfFloor'],
            visible: visible[19],
        }, {
            dataField: 'vacantLand',
            caption: this.labels['vacantLand'],
            dataType: 'boolean',
            visible: visible[20],
        }, {
            dataField: 'yearOfConstruction',
            caption: this.labels['yearOfConstruction'],
            visible: visible[21],
        }, {
            dataField: 'details',
            caption: this.labels['details'],
            visible: visible[22],
        }];
    }

    private showPicture(container, options) {
        if (options.data.idPicture) {
            this.pictureService.get(options.data.idPicture).subscribe((data) => {
                container.innerHTML = '<img height="100" src="data:image/jpeg;base64,' + data.picture + '" />';
            });
        }
    }

    private loadData() {
        switch (this.selectedMode) {
            case 'mode1':
                this.inspectionService.getToDo().subscribe(data => this.dataSource = data);
                break;
            case 'mode2':
                this.inspectionService.getForApproval().subscribe(data => this.dataSource = data);
                break;
            case 'mode3':
                this.inspectionService.getBuildingHistory().subscribe(data => this.dataSource = data);
                break;
            case 'mode4':
                this.inspectionService.getBuildingToDo().subscribe(data => this.dataSource = data);
                break;
            default:
                this.dataSource = [];
                break;
        }
    }

    private loadWebusers() {
        this.webuserService.getActive().subscribe(data => {
            this.webusers = data;
            this.checkLoadedElement();
        });
    }

    private loadLanes() {
        this.laneService.getAll().subscribe(data => {
            this.lanes = data;
            this.checkLoadedElement();
        });
    }

    private loadCities() {
        this.cityService.getAll().subscribe(data => {
            this.cities = data;
            this.checkLoadedElement();
        });
    }

    private loadRiskLevel() {
        this.riskLevelService.getAll().subscribe(data => {
            this.riskLevels = data;
            this.checkLoadedElement();
        });
    }

    private loadUtilisationCode() {
        this.utilisationCodeService.getAll().subscribe(data => {
            this.utilisationCodes = data;
            this.checkLoadedElement();
        });
    }
}
