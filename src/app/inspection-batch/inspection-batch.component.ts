import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

import {GridWithCrudService} from '../shared/classes/grid-with-crud-service';
import {InspectionBatchService} from './shared/services/inspection-batch.service';
import {WebuserService} from '../management-access/shared/services/webuser.service';
import {Building} from '../management-building/shared/models/building.model';
import {TranslateService} from '@ngx-translate/core';
import {WebuserForWeb} from '../management-access/shared/models/webuser-for-web.model';
import {BuildingService} from '../management-building/shared/services/building.service';
import {InspectionService} from '../inspection-approval/shared/services/inspection.service';


@Component({
    selector: 'app-inspection-batch',
    templateUrl: './inspection-batch.component.html',
    styleUrls: ['./inspection-batch.component.scss'],
    providers: [
        InspectionBatchService,
        WebuserService,
        BuildingService,
        InspectionService,
    ],
})
export class InspectionBatchComponent extends GridWithCrudService implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    labels = [];
    formUserField: any;
    formReadyField: any;
    formInspectionField: any;
    webusers: WebuserForWeb[];
    inspectorsOn: WebuserForWeb[] = [];
    inspectorsOff: WebuserForWeb[] = [];
    inspectorsList: WebuserForWeb[] = [];
    buildings: Building[] = [];
    buildingsInspected: Building[] = [];
    buildingsNotInspected: Building[] = [];
    buildingsWithoutInspection: Building[] = [];
    popupBuildingVisible = false;
    popupBuildingSelected = [];
    popupButtons: any[];

    constructor(
        translateService: TranslateService,
        batchService: InspectionBatchService,
        private webuserService: WebuserService,
        private buildingService: BuildingService,
        private inspectionService: InspectionService,
        private notification: MatSnackBar,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
        super(batchService);

        translateService.get([
            'all', 'addBuildingsToInspection', 'add', 'cancel', 'needInspectorAndBuildingForReadyInspection'
        ]).subscribe(data => {
            this.labels = data;

            this.popupButtons = [{
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: this.labels['add'],
                    onClick: () => this.onAddBuilding()
                }
            }, {
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

    ngOnInit() {
        this.loadSource(() => this.autoEditBatch());
        this.loadWebuser();
        this.loadBuilding();
        this.loadInspection();
    }

    onInitNewRow(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = Object.assign([], this.webusers);
        this.buildingsInspected = [];
        this.buildingsNotInspected = [];

        this.buildings.forEach(building => {
            this.buildingsWithoutInspection.forEach(inspection => {
                if (building.id === inspection['idBuilding']) {
                    building = Object.assign({}, building);

                    this.buildingsNotInspected.push(building);
                }
            });
        });

        e.data.idWebuserCreatedBy = localStorage.getItem('currentWebuser');
        e.data.isReadyForInspection = false;
        e.data.createOn = (new Date());
        e.data.isActive = true;

        this.inspectorsList = this.inspectorsOn.concat([{
            id: 'all',
            name: this.labels['all'],
        }]);
    }

    onEditingStart(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = [];
        this.buildingsInspected = [];
        this.buildingsNotInspected = [];
        const idBuildingsWithoutInspection = [];

        this.buildingsWithoutInspection.forEach(building => {
            idBuildingsWithoutInspection.push(building['idBuilding']);
        });

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
        this.buildings.forEach(building => {
            let find = false;

            e.data.inspections.forEach(inspection => {
                if (building.id === inspection.idBuilding) {
                    building = Object.assign({
                        assignedTo: inspection.idWebuserAssignedTo || 'all',
                        sequence: inspection.sequence,
                    }, building);

                    find = true;
                    this.buildingsInspected.push(building);
                }
            });

            if (!find) {
                if (idBuildingsWithoutInspection.includes(building.id)) {
                    this.buildingsNotInspected.push(Object.assign({}, building));
                }
            }
        });

        this.inspectorsList = this.inspectorsOn.concat([{
            id: 'all',
            name: this.labels['all'],
        }]);
    }

    onToolbarPreparing(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                text: this.labels['addBuildingsToInspection'],
                onClick: (ev) => {
                    this.popupBuildingSelected = [];
                    this.popupBuildingVisible = true;
                }
            },
            location: 'after',
        });
    }

    setFormReadyField(field) {
        this.formReadyField = field;
    }

    setFormUserField(field) {
        this.formUserField = field;

        if (!this.formUserField.value) {
            this.formUserField.value = [];
        }
    }

    setFormInspectionField(field) {
        this.formInspectionField = field;

        if (!this.formInspectionField.value) {
            this.formInspectionField.value = [];
        }
    }

    addInspector(e, field) {
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

    removeInspector(item) {
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

    onBuildingsRemoved(e) {
        this.moveBuildingsSource('buildings', 'buildingsNotInspected', e.key.id);

        let find = -1;
        this.formInspectionField.data.inspections.forEach((inspection, index) => {
            if (inspection.idBuilding === e.key.id) {
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

    onBuildingsUpdated(e) {
        this.formInspectionField.data.inspections.forEach((inspection, index) => {
            if (inspection.idBuilding === e.key.id) {
                this.formInspectionField.data.inspections[index].idWebuserAssignedTo = (
                    e.key.assignedTo === 'all' ? null : e.key.assignedTo
                );
                this.formInspectionField.data.inspections[index].sequence = (
                    e.key.sequence || 0
                );
            }
        });

        this.formInspectionField.setValue(this.formInspectionField.data.inspections);
    }

    moveUp(field) {
        if (field.rowIndex > 0) {
            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, (field.data.sequence - 1));

            field.component.editCell(field.rowIndex - 1, 0);
            field.component.cellValue(field.rowIndex - 1, 0, field.data.sequence);

            field.component.saveEditData();
        }
    }

    moveDown(field) {
        if (field.rowIndex < this.buildingsInspected.length - 1) {
            field.component.editCell(field.rowIndex + 1, 0);
            field.component.cellValue(field.rowIndex + 1, 0, field.data.sequence);

            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, field.data.sequence + 1);

            field.component.saveEditData();
        }
    }

    validateReady(e) {
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
        const buildingToInsert = Object.assign([], this.popupBuildingSelected);
        this.popupBuildingSelected = [];

        buildingToInsert.forEach(building => {
            const inspection = {
                sequence: this.formInspectionField.data.inspections.length,
                idBatch: this.formInspectionField.data.id,
                idBuilding: building.id,
                idWebuserAssignedTo: null,
                idWebuserCreatedBy: localStorage.getItem('currentWebuser'),
            };

            this.moveBuildingsSource('buildingsNotInspected', 'buildingsInspected', building.id);
            this.formInspectionField.value.push(inspection);
            this.popupBuildingVisible = false;
        });

        this.formInspectionField.setValue(this.formInspectionField.value);
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

    private moveBuildingsSource(sourceFrom, sourceTo, idBuilding) {
        let find = -1;

        this[sourceFrom].forEach((building, index) => {
            if (building.id === idBuilding) {
                find = index;
            }
        });

        if (find > -1) {
            const newBuilding = Object.assign({}, this[sourceFrom][find]);
            newBuilding.assignedTo = 'all';
            newBuilding.sequence = this[sourceTo].length;

            this[sourceTo].push(newBuilding);

            if (sourceFrom !== 'buildings') {
                this[sourceFrom].splice(find, 1);
            }
        }
    }

    private autoEditBatch() {
        this.activeRoute.params.subscribe(param => {
            const keys = this.dataSource.filter(row => {
                if (row.id === param.idBatch) {
                    return true;
                }
            });

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

    private loadWebuser() {
        this.webuserService.getActive().subscribe(data => this.webusers = data);
    }

    private loadBuilding() {
        this.buildingService.getActive().subscribe(data => this.buildings = data);
    }

    private loadInspection() {
        this.inspectionService.getBuildingToDo().subscribe(data => this.buildingsWithoutInspection = data);
    }
}
