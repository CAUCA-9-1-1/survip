import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent, DxPopupComponent} from 'devextreme-angular';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {GridWithCrudService} from '../shared/classes/grid-with-crud-service';
import {InspectionBatchService} from './shared/services/inspection-batch.service';
import {WebuserService} from '../management-system/shared/services/webuser.service';
import {TranslateService} from '@ngx-translate/core';
import {WebuserForWeb} from '../management-system/shared/models/webuser-for-web.model';
import {BuildingService} from '../management-department/shared/services/building.service';
import {InspectionService} from '../inspection-approval/shared/services/inspection.service';
import {InspectionBatch} from './shared/models/inspection-batch.model';
import {InspectionBuilding} from '../management-department/shared/models/inspectionBuilding';
import {ODataService} from '../shared/services/o-data.service';
import {EnumModel} from '../management-type-system/shared/models/enum.model';
import {InspectionStatusService} from '../inspection-dashboard/shared/services/inspection-status.service';

@Component({
    selector: 'app-inspection-batch',
    templateUrl: './inspection-batch.component.html',
    styleUrls: ['./inspection-batch.component.scss'],
    providers: [
        InspectionBatchService,
        WebuserService,
        BuildingService,
        InspectionService,
        InspectionStatusService,
    ],
})
export class InspectionBatchComponent extends GridWithCrudService implements OnInit {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;

    private labels = [];
    private selectedBuildingIds: any[] = [];
    private popupBuildingSelected = [];
    private editPopup: DxPopupComponent;
    private popupToolBarItems = [];
    private formUserField: any;
    private formReadyField: any;
    private formInspectionField: any;
    private webusers: WebuserForWeb[];

    public inspectorsOn: WebuserForWeb[] = [];
    public inspectorsOff: WebuserForWeb[] = [];
    public inspectorsList: WebuserForWeb[] = [];
    public inspectionStatuses: EnumModel[] = [];
    public inspectionBuildingList: InspectionBuilding[] = [];
    public availableBuildingsDataSource: any = {};
    public popupBuildingVisible = false;
    public popupButtons: any[];
    public popupEditorOptions = {onKeyDown: e => this.onFormUpdated()};

    constructor(
        translateService: TranslateService,
        private batchService: InspectionBatchService,
        private webuserService: WebuserService,
        private buildingService: BuildingService,
        private inspectionService: InspectionService,
        private inspectionStatusService: InspectionStatusService,
        private notification: MatSnackBar,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private injector: Injector,
    ) {
        super(null, batchService);
        this.createStore('AvailableBuildingForManagement');
        translateService.get([
            'all', 'addBuildingsToInspection', 'add', 'cancel', 'needInspectorAndBuildingForReadyInspection',
            'delete', 'deleteInspectionStartedMessage', 'deleteDownloadedInspection', 'deleteInspection'
        ]).subscribe(data => {
            this.labels = data;

            this.popupButtons = [{
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: this.labels['add'],
                    onClick: () => this.onAddBuilding()
                }
            }, {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: this.labels['cancel'],
                    onClick: () => {
                        this.popupBuildingVisible = false;
                    }
                }
            }];
        });
    }

    private createStore(url: string) {
        this.availableBuildingsDataSource = {
            store: new ODataService(this.injector, {
                url: url,
                key: 'idBuilding',
                keyType: 'Guid',
                onRefreshLogin: () => {
                    this.dataGrid.instance.refresh();
                },
                onLoaded: () => {}
            }),
        };
    }

    public civicNumber_customizeText(cellInfo) {
        return cellInfo.value.replace(/^0+/, '');
    }

    public setModel(data: any) {
        return InspectionBatch.fromJSON(data);
    }

    public async ngOnInit() {
        await this.activeRoute.params.subscribe(param => {
            this.loadOneWithCallBack(param.idBatch, () => this.autoEditBatch());
        });

        this.loadWebuser();

        this.inspectionStatusService.getAll()
            .subscribe(data => {
                this.inspectionStatuses = data;
            });
    }

    public onInitNewRow(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = Object.assign([], this.webusers);

        e.data.idWebuserCreatedBy = sessionStorage.getItem('currentWebuser');
        e.data.isReadyForInspection = false;
        e.data.createOn = (new Date());
        e.data.isActive = true;
        this.inspectionBuildingList = [];
    }

    private createAllUserChoice(): WebuserForWeb {
        const allUser = new WebuserForWeb;
        allUser.id = null;
        allUser.name = this.labels['all'];
        return allUser;
    }

    public onEditingStart(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = [];

        this.loadInspectionBuildingList(e.data.id);
        this.inspectorsList.push(this.createAllUserChoice());

        this.webusers.forEach(user => {
            let find = false;

            e.data.users.forEach(inspector => {
                if (user.id === inspector.idWebuser) {
                    find = true;
                    this.inspectorsOn.push(user);
                }
            });

            if (!find) {
                this.inspectorsOff.push(user);
            }
        });

        this.inspectorsList = this.inspectorsList.concat(this.inspectorsOn);
    }

    public popupShown = (e) => {
        this.editPopup = e.component;
        this.managePopupCancelButton(true);
    };

    public managePopupCancelButton(isDisabled: boolean) {
        this.popupToolBarItems = this.editPopup['option']('toolbarItems');
        this.popupToolBarItems[1].options.disabled = isDisabled;
        this.editPopup['option']('toolbarItems', this.popupToolBarItems);
    }

    public onFormUpdated() {
        this.managePopupCancelButton(false);
    }

    public onToolbarPreparing(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                text: this.labels['addBuildingsToInspection'],
                onClick: () => {
                    this.popupBuildingSelected = [];
                    this.popupBuildingVisible = true;
                }
            },
            location: 'after',
        });
    }

    public setFormReadyField(field) {
        this.formReadyField = field;
    }

    public setFormUserField(field) {
        this.formUserField = field;

        if (!this.formUserField.value) {
            this.formUserField.value = [];
        }
    }

    public setFormInspectionField(field) {
        this.formInspectionField = field;

        if (!this.formInspectionField.value) {
            this.formInspectionField.value = [];
        }
    }

    public addInspector(e) {
        const inspector = Object.assign({}, e.selectedItem);
        const users = this.formUserField.value;

        if ('id' in inspector) {
            users.push({
                idWebuser: inspector.id,
                idBatch: this.formUserField.data.id,
            });

            this.moveInspectorsSource('inspectorsOff', 'inspectorsOn', inspector.id);
            this.formUserField.setValue(users);

            e.component.option('value', '');
        }
    }

    public removeInspector(item) {
        this.moveInspectorsSource('inspectorsOn', 'inspectorsOff', item.id);
        let findWebuser = -1;

        this.formUserField.value.forEach((user, index) => {
            if (user.idWebuser === item.id) {
                findWebuser = index;
            }
        });

        if (findWebuser > -1) {
            this.formUserField.value.splice(findWebuser, 1);
            this.formUserField.setValue(this.formUserField.value);

            if (this.formUserField.data.users.length === 0) {
                this.formReadyField.setValue(false);
            }
        }
    }

    public onRowRemoving(e) {
        let message: string;
        if (e.data.hasBeenDownloaded) {
            message = this.labels['deleteDownloadedInspection'];
        } else {
            message = this.labels['deleteInspection'];
        }

        const index = e.component.getRowIndexByKey(e.key);
        const rowEl = e.component.getRowElement(index);
        rowEl[0].classList.add('rowToDelete');

        const res = confirm(message, this.labels['delete']);

        e.cancel = new Promise((resolve) => {
            res.then((dialogResult) => {
                rowEl[0].classList.remove('rowToDelete');
                resolve(!dialogResult);
            });
        });
    }

    public onBuildingsRemoved(e) {
        let find = -1;
        this.formInspectionField.data.inspections.forEach((inspection, index) => {
            if (inspection.idBuilding === e.key.idBuilding) {
                find = index;
            }
        });

        if (find > -1) {
            this.formInspectionField.data.inspections.splice(find, 1);
        }

        this.formInspectionField.setValue(this.formInspectionField.data.inspections);

        if (this.formInspectionField.data.inspections.length === 0) {
            this.formReadyField.setValue(false);
        }
    }

    public onBuildingsUpdated(e) {
        this.formInspectionField.data.inspections.forEach((inspection, index) => {
            if (inspection.idBuilding === e.key.idBuilding) {
                this.formInspectionField.data.inspections[index].idWebuserAssignedTo = (
                    e.key.idWebuserAssignedTo || null
                );
                this.formInspectionField.data.inspections[index].sequence = (
                    e.key.sequence || 0
                );
            }
        });

        this.formInspectionField.setValue(this.formInspectionField.data.inspections);
    }

    public moveUp(field) {
        if (field.rowIndex > 0) {
            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, (field.data.sequence - 1));

            field.component.editCell(field.rowIndex - 1, 0);
            field.component.cellValue(field.rowIndex - 1, 0, field.data.sequence);

            field.component.saveEditData();
        }
    }

    public moveDown(field) {
        if (field.rowIndex < this.inspectionBuildingList.length - 1) {
            field.component.editCell(field.rowIndex + 1, 0);
            field.component.cellValue(field.rowIndex + 1, 0, field.data.sequence);

            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, field.data.sequence + 1);

            field.component.saveEditData();
        }
    }

    public validateReady(e) {
        if (e.value) {
            let valid = true;

            if (!this.formReadyField.key.users || !this.formReadyField.key.inspections) {
                valid = false;
            } else if (this.formReadyField.key.users.length === 0 || this.formReadyField.key.inspections.length === 0) {
                valid = false;
            }

            if (!valid) {
                this.notification.open(this.labels['needInspectorAndBuildingForReadyInspection'], '', {
                    duration: 5000,
                    panelClass: ['error-toasts']
                });

                e.value = false;
                e.component.option('value', false);
            }
        }

        this.formReadyField.setValue(e.value);
    }

    private onAddBuilding() {

        const selectedIds = [];
        this.selectedBuildingIds.forEach(selection => selectedIds.push(selection._value));

        this.buildingService.getForInspectionlist(selectedIds).subscribe((buildings) => {
            buildings.forEach(building => {
                const inspection = {
                    sequence: (this.formInspectionField.data.inspections ? this.formInspectionField.data.inspections.length : 0),
                    idBatch: this.formInspectionField.data.id,
                    idBuilding: building.idBuilding,
                    idWebuserAssignedTo: null,
                    idWebuserCreatedBy: sessionStorage.getItem('currentWebuser'),
                };

                const toAdd = new InspectionBuilding();
                toAdd.cityName = building.cityName;
                toAdd.fullCivicNumber = building.fullCivicNumber;
                toAdd.fullCivicNumberSortable = building.fullCivicNumberSortable;
                toAdd.fullLaneName = building.fullLaneName;
                toAdd.idBuilding = building.idBuilding;
                toAdd.idRiskLevel = building.idRiskLevel;
                toAdd.idWebuserAssignedTo = null;
                toAdd.idWebuserCreatedBy = inspection.idWebuserAssignedTo;
                toAdd.idBatch = this.formInspectionField.data.id;
                toAdd.sequence = inspection.sequence;
                toAdd.matricule = building.matricule;
                toAdd.riskLevel = building.riskLevel;
                this.inspectionBuildingList.push(toAdd);

                this.formInspectionField.value.push(inspection);
                this.popupBuildingVisible = false;
            });
            this.formInspectionField.setValue(this.formInspectionField.value);
        });
    }

    private moveInspectorsSource(sourceFrom, sourceTo, idWebuser) {
        let find = -1;

        this[sourceFrom].forEach((user, index) => {
            if (user.id === idWebuser) {
                find = index;
            }
        });

        if (find > -1) {
            this[sourceTo].push(this[sourceFrom][find]);
            this[sourceFrom].splice(find, 1);
        }
    }

    private autoEditBatch() {
        this.activeRoute.params.subscribe(param => {
            const idBatch = param.idBatch;
            const keys = this.dataSource.filter(row => row.id === idBatch);

            if (keys.length) {
                setTimeout(() => {
                    const rowIndex = this.dataGrid.instance.getRowIndexByKey(keys[0]);
                    this.dataGrid.instance.editRow(rowIndex);
                    this.dataGrid.instance['getController']('editing')._editPopup.option('onHidden', () => {
                        this.router.navigate(['/inspection/dashboard']);
                    });
                }, 200);
            }
        });
    }

    private loadInspectionBuildingList(idBatch: string) {
        this.batchService.getInspections(idBatch).subscribe(data => {
            this.inspectionBuildingList = data;
        });
    }

    private loadWebuser() {
        this.webuserService.getActive().subscribe(data => this.webusers = data);
    }

    public onStatusActionValidation(e) {
        if (e.data && e.data.inspectionStatus !== 0 && e.column.command === 'edit') {
            e.cellElement.querySelector('.dx-link-delete').style.opacity = '0.5';
            e.cellElement.querySelector('.dx-link-delete').style.pointerEvents = 'none';
            e.cellElement.querySelector('.dx-link-delete').style.color = '#959595';
        }
        if (e.data && ([2, 3, 4, 5].includes(e.data.inspectionStatus)) && e.column.command === 'edit') {
            e.cellElement.querySelector('.dx-link-edit').style.opacity = '0.5';
            e.cellElement.querySelector('.dx-link-edit').style.pointerEvents = 'none';
            e.cellElement.querySelector('.dx-link-edit').style.color = '#959595';
        }
    }
}
