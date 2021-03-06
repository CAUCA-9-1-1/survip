import {AfterViewInit, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {MatDialog, MatSnackBar} from '@angular/material';
import {confirm} from 'devextreme/ui/dialog';
import {saveAs} from 'file-saver';
import {LaneService} from '../management-department/shared/services/lane.service';
import {RiskLevelService} from '../management-system/shared/services/risk-level.service';
import {RiskLevel} from '../management-system/shared/models/risk-level.model';
import {UtilisationCode} from '../management-system/shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../management-system/shared/services/utilisation-code.service';
import {CityService} from '../management-address/shared/services/city.service';
import {InspectionBatchService} from '../inspection-batch/shared/services/inspection-batch.service';
import {InspectionBatch} from '../inspection-batch/shared/models/inspection-batch.model';
import {AskBatchDescriptionComponent} from './ask-batch-description/ask-batch-description.component';
import {WebuserForWeb} from '../management-system/shared/models/webuser-for-web.model';
import {WebuserService} from '../management-system/shared/services/webuser.service';
import {PictureService} from '../shared/services/picture.service';
import {ODataService} from '../shared/services/o-data.service';
import {ReportGenerationService} from './shared/services/report-generation.service';
import {ConfigurationTemplate} from '../shared/models/configuration-template.model';
import {ReportTemplateService} from '../shared/services/report-template.service';
import {AuthGuardService} from '../shared/services/auth-guard.service';
import Guid from 'devextreme/core/guid';
import {InspectionStatusService} from './shared/services/inspection-status.service';
import {EnumModel} from '../management-type-system/shared/models/enum.model';


@Component({
    selector: 'app-dashboard-inspection',
    templateUrl: './inspection-dashboard.component.html',
    styleUrls: ['./inspection-dashboard.component.scss'],
    providers: [
        LaneService,
        CityService,
        RiskLevelService,
        UtilisationCodeService,
        InspectionBatchService,
        PictureService,
        WebuserService,
        ReportGenerationService,
        ReportTemplateService,
        InspectionStatusService,
    ]
})
export class InspectionDashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;

    public nonDefaultTemplateIdentifiers: ConfigurationTemplate[];
    public defaultTemplateIdentifiers: ConfigurationTemplate[];
    public dataSource: any = {};
    public webusers: WebuserForWeb[] = [];
    public lanes: any = {store: []};
    public rawLanes: any[];
    public cities: any = {store: []};
    public riskLevels: RiskLevel[] = [];
    public utilisationCodes: UtilisationCode[] = [];
    public labels = {};
    public selectedMode = 'mode1';
    public buttons: any = {};
    public angularIsLoaded = false;
    public everythingIsLoaded = false;
    public accessTo = {
        approveInspection: false,
        batchManagement: false,
    };

    private inspectionStatus: EnumModel[] = [];

    constructor(
        private injector: Injector,
        private webuserService: WebuserService,
        private laneService: LaneService,
        private cityService: CityService,
        private inspectionStatusService: InspectionStatusService,
        private riskLevelService: RiskLevelService,
        private utilisationCodeService: UtilisationCodeService,
        private translateService: TranslateService,
        private notification: MatSnackBar,
        private batchService: InspectionBatchService,
        private pictureService: PictureService,
        private router: Router,
        private dialog: MatDialog,
        private reportGenerationService: ReportGenerationService,
        private reportTemplateService: ReportTemplateService,
        private authGuardService: AuthGuardService,
    ) {
    }
    private loadingVisible = false;

    public ngOnInit() {
        this.defaultTemplateIdentifiers = [];
        this.nonDefaultTemplateIdentifiers = [];

        this.inspectionStatusService.getAll().subscribe(data => this.inspectionStatus = data);
        this.loadRiskLevel();
        this.loadCities();
        this.loadLanes();
        this.loadWebusers();
        this.loadUtilisationCode();
        this.fetchTemplateIdentifiers();

        this.translateService.get([
            'riskLevel', 'civicNumber', 'lane', 'transversal', 'city', 'postalCode', 'batch', 'status', 'note', 'anomaly',
            'lastInspection', 'inspectionType', 'contact', 'owner', 'picture', 'buildingValue', 'details', 'matricule',
            'numberOfAppartment', 'numberOfBuilding', 'numberOfFloor', 'utilisationCode', 'see', 'vacantLand', 'delete',
            'yearOfConstruction', 'webuserAssignedTo', 'createBatch', 'needMinimum1Building', 'approve', 'todo', 'absent',
            'started', 'waitingApprobation', 'approved', 'refused', 'canceled', 'collapseAll', 'expandAll', 'wantToDeleteBatch',
            'generateReport', 'deleteBatchStartedMessage', 'nonDefaultReports', 'downloaded', 'wantToDeleteBatchWithDownloadedInspection',
            'completedOn'
        ]).subscribe(labels => {
            this.labels = labels;
            this.checkLoadedElement();
        });

        this.accessTo.approveInspection = this.authGuardService.hasRight('RightApproveInspection');
        this.accessTo.batchManagement = this.authGuardService.hasRight('RightBatchManagement');
    }

    public ngAfterViewInit() {
        this.angularIsLoaded = true;
        this.checkLoadedElement();
    }

    private getGroupItem(field) {
        if (field.data != null) {
            if (field.data.items && field.data.items.length > 0) {
                return field.data.items[0];
            }
            if (field.data.collapsedItems && field.data.collapsedItems.length > 0) {
                return field.data.collapsedItems[0];
            }
        }
        return null;
    }

    public getGroupBatchDescription(field) {
        const item = this.getGroupItem(field);
        return item ? item.batchDescription : '';
    }

    public getGroupBatchStartOn(field) {
        const item = this.getGroupItem(field);
        return item ? item.shouldStartOn : '';
    }

    public getGroupBatchIsReadyForInspection(field) {
        const item = this.getGroupItem(field);
        return item && item.isReadyForInspection ? 'isReadyForInspection' : '';
    }

    public changeMode(mode) {
        this.selectedMode = mode;
        this.checkLoadedElement();
    }

    public showBatch(field) {
        if (field.data && (field.data.items || field.data.collapsedItems).length) {
            this.router.navigate(['/inspection/batch', (field.data.items || field.data.collapsedItems)[0].idBatch.toString()]);
        }
    }

    public removeBatch(field) {
        if (!field.data.items[0].isBatchStarted) {
            let message: string;
            if (this.hasVisit(field.data.items)) {
                message = this.labels['wantToDeleteBatchWithDownloadedInspection'];
            } else {
                message = this.labels['wantToDeleteBatch'];
            }
            confirm(message, this.labels['delete']).then((result) => {
                if (result) {
                    this.batchService.remove(field.data.items[0].idBatch.toString()).subscribe(() => this.loadData());
                }
            });
        } else {
            this.notification.open(this.labels['deleteBatchStartedMessage'], '', {
                duration: 5000,
                panelClass: ['error-toasts']
            });
        }
    }

    private hasVisit(items: any[]): boolean {
        let toReturn = false;
        items.forEach(c => {
                if (c.hasBeenDownloaded) {
                    toReturn = true;
                }
            });
        return toReturn;
    }

    public showInspection(field) {
        if (field.data) {
            this.router.navigate(['/inspection/dashboard', field.data.idInspection.toString()]);
        }
    }

    public fetchTemplateIdentifiers(): void {
        this.reportTemplateService.getTemplateList().subscribe(data => {
            data.forEach((templateIdentifier) => {
                if (templateIdentifier.isDefault) {
                    this.defaultTemplateIdentifiers.push(templateIdentifier);
                } else {
                    this.nonDefaultTemplateIdentifiers.push(templateIdentifier);
                }
            });
        });
    }

    public generateReport(buildingId: string, templateId: string) {
        this.loadingVisible = true;
        this.reportGenerationService.generateReport(buildingId, templateId).subscribe(data => {
            const blob = new Blob([data], {type: 'application/pdf'});
            saveAs(blob, buildingId);
            this.loadingVisible = false;
        });
    }

    private checkLoadedElement(): boolean {
        if (
            this.angularIsLoaded && this.labels !== {} &&
            this.riskLevels.length && this.lanes.store.length &&
            this.cities.store.length && this.utilisationCodes.length &&
            this.webusers.length
        ) {
            this.everythingIsLoaded = false;
            this.setDatagrid();
            this.loadData();

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
            return this.notification.open(this.labels['needMinimum1Building'], '', {
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
            if (result && result.description) {
                const batch = InspectionBatch.fromJSON({
                    description: result.description,
                    idWebuserCreatedBy: sessionStorage.getItem('currentWebuser'),
                    isActive: true,
                    isReadyForInspection: false,
                    inspections: [],
                });

                buildings.forEach(building => {
                    batch.inspections.push({
                        idBuilding: building,
                        idWebuserCreatedBy: sessionStorage.getItem('currentWebuser'),
                        isActive: true,
                    });
                });

                this.batchService.save(batch).subscribe((data) => {
                    this.router.navigate(['inspection/batch', data.id]);
                });
            }
        });
    }

    private setDatagrid() {
        const columns = this.getColumns();

        this.dataGrid.instance.option({
            allowColumnResizing: true,
            filterRow: {
                visible: true,
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
                const width = [];

                for (let i = 0, j = e.component.columnCount(); i < j; i++) {
                    visible.push(e.component.columnOption(i, 'visible'));
                    width.push(e.component.columnOption(i, 'width'));
                }

                localStorage.setItem('column-visible-' + this.selectedMode, JSON.stringify(visible));
                localStorage.setItem('column-width-' + this.selectedMode, JSON.stringify(width));
            },
            onEditorPreparing: (e) => {
                this.prepareEditorForLaneTransversalAndCity(e);
                this.prepareEditorForNumber(e);
                this.prepareEditorForDecimal(e);
                this.prepareEditorForMatricule(e);
            },
            selection: {
                mode: 'multiple'
            },
            summary: {
                groupItems: [{
                    column: 'idBuilding',
                    summaryType: 'min'
                }]
            },
            onToolbarPreparing: (e) => this.customizeToolbar(e)
        });
    }

    private prepareEditorForLaneTransversalAndCity(e) {
        if (e.dataField === 'idLane' || e.dataField === 'idLaneTransversal' ||
            e.dataField === 'idCity' || e.dataField === 'idUtilisationCode') {
            e.editorName = 'dxLookup';
            e.editorOptions.showClearButton = true;
            e.editorOptions.closeOnOutsideClick = true;
        }
    }

    private prepareEditorForNumber(e) {
        if (e.dataField === 'numberOfAppartment' || e.dataField === 'numberOfBuilding' ||
            e.dataField === 'numberOfFloor' || e.dataField === 'yearOfConstruction') {
            const keys = [8, 13, 9, 46];

            e.editorOptions.inputAttr = {maxLength: 4};

            this.initDigitEditorEvents(e, keys);
        }
    }

    private prepareEditorForMatricule(e) {
        if (e.dataField === 'matricule') {
            const keys = [8, 13, 9, 46];

            e.editorOptions.inputAttr = {maxLength: 18};

            this.initDigitEditorEvents(e, keys);
        }
    }

    private prepareEditorForDecimal(e) {
        if (e.dataField === 'buildingValue') {
            const keys = [8, 13, 9, 46, 110];

            this.initDigitEditorEvents(e, keys);
        }
    }

    private initDigitEditorEvents(e, keys) {
        e.editorOptions.onKeyDown = (ev) => {
            ev.component.instance('dxNumberBox').option('min', 0);
            if (!ev.event.key.match(/[0-9]/) && (keys.indexOf(ev.event.keyCode) < 0)) {
                ev.event.preventDefault();
            }
        };
    }

    private customizeToolbar(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                text: this.labels['collapseAll'],
                icon: 'spinright',
                visible: this.canCollapseGroup(),
                onInitialized: (ev) => {
                    this.buttons['closeAll'] = ev.component;
                },
                onClick: (ev) => this.openCloseGroup(ev, 0)
            },
            location: 'after',
        });

        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                text: this.labels['createBatch'],
                icon: 'group',
                visible: this.canManageBatch(),
                onInitialized: (ev) => {
                    this.buttons['createBatch'] = ev.component;
                },
                onClick: (ev) => this.createBatch(ev)
            },
            location: 'after',
        });
    }

    private canManageBatch() {
        return (
            this.accessTo.batchManagement &&
            (this.selectedMode === 'mode3' || this.selectedMode === 'mode4') ? true : false
        );
    }

    private canCollapseGroup() {
        return (this.selectedMode === 'mode1' || this.selectedMode === 'mode2' ? true : false);
    }

    private openCloseGroup(e, groupIndex) {
        if (e.component.option('icon') === 'spinright') {
            e.component.option('icon', 'spindown');
            e.component.option('text', this.labels['expandAll']);
            this.dataGrid.instance.collapseAll(groupIndex);
        } else {
            e.component.option('icon', 'spinright');
            e.component.option('text', this.labels['collapseAll']);
            this.dataGrid.instance.expandAll(groupIndex);
        }
    }

    private getDefaultColumnVisible() {
        const visible = [
            false, true, true, true, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false
        ];

        switch (this.selectedMode) {
            case 'mode1':
                visible[7] = true;
                visible[8] = true;
                visible[9] = true;
                visible[25] = true;
                break;
            case 'mode2':
                visible[0] = true;
                visible[7] = true;
                visible[8] = true;
                visible[9] = true;
                visible[10] = true;
                visible[11] = true;
                break;
            case 'mode3':
                visible[10] = true;
                visible[11] = true;
                visible[12] = true;
                visible[24] = true;
                break;
            case 'mode4':
                visible[5] = true;
                break;
            default:
                break;
        }

        return visible;
    }

    private trimLeadingZeroes(str): string {
        if (!str) {
            return '';
        }
        const xLastChr = str.length - 1;
        let xChrIdx = 0;
        while (str[xChrIdx] === '0' && xChrIdx < xLastChr) {
            xChrIdx++;
        }
        return xChrIdx > 0 ? str.substr(xChrIdx) : str;
    }

    private getColumns(): any[] {
        const visible = JSON.parse(localStorage.getItem('column-visible-' + this.selectedMode)) || this.getDefaultColumnVisible();
        const width = JSON.parse(localStorage.getItem('column-width-' + this.selectedMode)) || [];

        return [{
            caption: this.labels['approve'],
            dataType: 'string',
            visible: visible[0],
            width: width[0] || null,
            cellTemplate: 'approveInspection',
            showInColumnChooser: false,
        }, {
            dataField: 'idRiskLevel',
            caption: this.labels['riskLevel'],
            dataType: 'string',
            lookup: {
                dataSource: this.riskLevels,
                valueExpr: 'id',
                displayExpr: (data) => {
                    return data.name;
                }
            },
            calculateFilterExpression: function(
                filterValue,
            ) {
                return [this.dataField, '=', new Guid(filterValue)];
            },
            visible: visible[1],
            width: width[1] || null,
        }, {
            dataField: 'fullCivicNumberSortable',
            customizeText: (cellInfo) => this.trimLeadingZeroes(cellInfo.value),
            caption: this.labels['civicNumber'],
            dataType: 'string',
            visible: visible[2],
            width: width[2] || null,
        }, {
            dataField: 'idLane',
            caption: this.labels['lane'],
            dataType: 'string',
            calculateFilterExpression: function(
                filterValue,
            ) {
                return [this.dataField, '=', new Guid(filterValue)];
            },
            lookup: {
                dataSource: this.lanes,
                valueExpr: 'id',
                displayExpr: (value) => this.getLaneName(value),
            },
            visible: visible[3],
            width: width[3] || null,
        }, {
            dataField: 'idLaneTransversal',
            caption: this.labels['transversal'],
            dataType: 'string',
            calculateFilterExpression: function(
                filterValue,
            ) {
                return [this.dataField, '=', new Guid(filterValue)];
            },
            lookup: {
                dataSource: this.lanes,
                valueExpr: 'id',
                displayExpr: (value) => this.getLaneName(value),
            },
            visible: visible[4],
            width: width[4] || null,
        }, {
            dataField: 'idCity',
            caption: this.labels['city'],
            dataType: 'string',
            visible: visible[5],
            width: width[5] || null,
            calculateFilterExpression: function(
                filterValue,
            ) {
                return [this.dataField, '=', new Guid(filterValue)];
            },
            lookup: {
                dataSource: this.cities,
                valueExpr: 'id',
                displayExpr: 'name'
            },
        }, {
            dataField: 'postalCode',
            caption: this.labels['postalCode'],
            dataType: 'string',
            visible: visible[6],
            width: width[6] || null,
        }, {
            dataField: 'webuserAssignedTo',
            caption: this.labels['webuserAssignedTo'],
            dataType: 'string',
            visible: visible[7],
            width: width[7] || null,
        }, {
            dataField: 'idBatch',
            caption: this.labels['batch'],
            dataType: 'string',
            visible: visible[8],
            width: width[8] || null,
            groupIndex: (this.selectedMode === 'mode1' || this.selectedMode === 'mode2' ? 0 : null),
            groupCellTemplate: 'groupBatch',
            showWhenGrouped: false,
            showInColumnChooser: false,
        }, {
            dataField: 'inspectionStatus',
            caption: this.labels['status'],
            dataType: 'string',
            visible: visible[9],
            width: width[9] || null,
            lookup: {
                displayExpr: 'text',
                valueExpr: 'name',
                dataSource: this.inspectionStatus
            }
        }, {
            dataField: 'hasAnomaly',
            caption: this.labels['anomaly'],
            dataType: 'boolean',
            visible: visible[10],
            width: width[10] || null,
        }, {
            dataField: 'lastInspectionOn',
            caption: this.labels['lastInspection'],
            dataType: 'date',
            visible: visible[11],
            width: width[11] || null,
        }, {
            dataField: 'contacts',
            caption: this.labels['contact'],
            dataType: 'string',
            visible: visible[12],
            width: width[12] || null,
        }, {
            dataField: 'owner',
            caption: this.labels['owner'],
            dataType: 'string',
            visible: visible[13],
            width: width[13] || null,
        }, {
            dataField: 'idUtilisationCode',
            caption: this.labels['utilisationCode'],
            dataType: 'string',
            calculateFilterExpression: function(
                filterValue,
            ) {
                console.log('City');
                return [this.dataField, '=', new Guid(filterValue)];
            },
            lookup: {
                dataSource: this.utilisationCodes,
                valueExpr: 'id',
                displayExpr: 'name'
            },
            visible: visible[14],
            width: width[14] || null,
        }, {
            dataField: 'idPicture',
            caption: this.labels['picture'],
            dataType: 'object',
            visible: visible[15],
            width: width[15] || null,
            cellTemplate: (container, options) => this.showPicture(container, options),
            allowFiltering: false,
        }, {
            dataField: 'buildingValue',
            caption: this.labels['buildingValue'],
            dataType: 'number',
            visible: visible[16],
            width: width[16] || null,
        }, {
            dataField: 'matricule',
            caption: this.labels['matricule'],
            dataType: 'string',
            visible: visible[17],
            width: width[17] || null,
        }, {
            dataField: 'numberOfAppartment',
            caption: this.labels['numberOfAppartment'],
            visible: visible[18],
            width: width[18] || null,
        }, {
            dataField: 'numberOfBuilding',
            caption: this.labels['numberOfBuilding'],
            visible: visible[19],
            width: width[19] || null,
        }, {
            dataField: 'numberOfFloor',
            caption: this.labels['numberOfFloor'],
            visible: visible[20],
            width: width[20] || null,
        }, {
            dataField: 'vacantLand',
            caption: this.labels['vacantLand'],
            dataType: 'boolean',
            visible: visible[21],
            width: width[21] || null,
        }, {
            dataField: 'yearOfConstruction',
            caption: this.labels['yearOfConstruction'],
            visible: visible[22],
            width: width[22] || null,
        }, {
            dataField: 'details',
            caption: this.labels['details'],
            dataType: 'string',
            visible: visible[23],
            width: width[23] || null,
        }, {
            caption: this.labels['generateReport'],
            dataType: 'string',
            visible: visible[24],
            width: width[24] || null,
            cellTemplate: 'generateReport',
            showInColumnChooser: false,
        }, {
            dataField: 'hasBeenDownloaded',
            caption: this.labels['downloaded'],
            dataType: 'boolean',
            visible: visible[25],
            width: width[25] || null,
            cellTemplate: 'iconHasBeenDownloaded',
            showInColumnChooser: this.selectedMode === 'mode1'
        }, {
            dataField: 'completedOn',
            caption: this.labels['completedOn'],
            dataType: 'date',
            visible: visible[26],
            width: width[26] || null,
            showInColumnChooser: this.selectedMode === 'mode3'
          }
        ];
    }

    private showPicture(container, options) {
        if (options.data.idPicture) {
            this.pictureService.getOne(options.data.idPicture).subscribe((data) => {
                container.innerHTML = '<img height="100" src="' + data.dataUri + '" />';
            });
        }
    }

    private loadData() {
        switch (this.selectedMode) {
            case 'mode1':
                this.createStore('InspectionsToDo');
                break;
            case 'mode2':
                this.createStore('InspectionsForApproval');
                break;
            case 'mode3':
                this.createStore('InspectionsCompleted');
                break;
            case 'mode4':
                this.createStore('BuildingsWithoutInspection');
                break;
            default:
                this.dataSource = [];
                break;
        }
    }

    private createStore(url: string) {
        this.dataSource = {
            store: new ODataService(this.injector, {
                url: url,
                key: 'idBuilding',
                keyType: 'Guid',
                onLoaded: () => {
                  this.everythingIsLoaded = true;
                },
                onRefreshLogin: () => this.createStore(url)
            }),
        };
    }

    private loadWebusers() {
        this.webuserService.getActive().subscribe(data => {
            this.webusers = data;
            this.checkLoadedElement();
        });
    }

    private loadLanes() {
        this.laneService.localized().subscribe(data => {
            this.rawLanes = data;
            this.lanes = {
                store: data,
                select: ['id', 'name', 'cityName'],
                sort: ['name', 'cityName'],
            };
            this.checkLoadedElement();
        });
    }

    private loadCities() {
        this.cityService.localized().subscribe(data => {
            this.cities = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
            this.checkLoadedElement();
        });
    }

    private loadRiskLevel() {
        this.riskLevelService.localized().subscribe(data => {
            this.riskLevels = data;
            this.checkLoadedElement();
        });
    }

    private loadUtilisationCode() {
        this.utilisationCodeService.localized().subscribe(data => {
            this.utilisationCodes = data;
            this.checkLoadedElement();
        });
    }

    private getLaneName(lane) {
        if (lane != null) {
            if (this.rawLanes.some(currentLane => currentLane.id !== lane.id && currentLane.name === lane.name)) {
                return lane.name + ' (' + lane.cityName + ')';
            }
            return lane.name;
        }
        return '';
    }
}
