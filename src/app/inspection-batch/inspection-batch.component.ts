import {Component, OnInit, ViewChild} from '@angular/core';
import {GridWithCrudService} from '../shared/classes/grid-with-crud-service';
import {InspectionBatchService} from './shared/services/inspection-batch.service';
import {WebuserService} from '../management-access/shared/services/webuser.service';
import {Building} from '../management-building/shared/models/building.model';
import {BuildingService} from '../management-building/shared/services/building.service';
import {TranslateService} from '@ngx-translate/core';
import {WebuserForWeb} from '../management-access/shared/models/webuser-for-web.model';
import {DxDataGridComponent} from 'devextreme-angular';


@Component({
    selector: 'app-inspection-batch',
    templateUrl: './inspection-batch.component.html',
    styleUrls: ['./inspection-batch.component.scss'],
    providers: [
        InspectionBatchService,
        WebuserService,
        BuildingService,
    ],
})
export class InspectionBatchComponent extends GridWithCrudService implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    labels = [];
    formUserField: any;
    formInspectionField: any;
    webusers: WebuserForWeb[];
    inspectorsOn: WebuserForWeb[] = [];
    inspectorsOff: WebuserForWeb[] = [];
    inspectorsList: WebuserForWeb[] = [];
    buildings: Building[] = [];
    buildingsInspected: Building[] = [];
    buildingsNotInspected: Building[] = [];
    popupBuildingVisible = false;
    popupBuildingSelected = [];
    popupButtons: any[];

    constructor(
        translateService: TranslateService,
        batchService: InspectionBatchService,
        private webuserService: WebuserService,
        private buildingService: BuildingService,
    ) {
        super(batchService);

        translateService.get(['all', 'addBuildingsToInspection', 'add', 'cancel']).subscribe(data => {
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
        this.loadSource();
        this.loadWebuser();
        this.loadBuilding();
    }

    onInitNewRow(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = Object.assign([], this.webusers);
        this.buildingsInspected = [];
        this.buildingsNotInspected = Object.assign([], this.buildings);

        e.data.idWebuserCreatedBy = localStorage.getItem('currentWebuser');
        e.data.isReadyForInspection = false;
        e.data.createOn = (new Date());
        e.data.isActive = true;
    }

    onEditingStart(e) {
        this.inspectorsOn = [];
        this.buildingsInspected = [];
        this.buildingsNotInspected = [];

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
                this.buildingsNotInspected.push(building);
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
            field.component.editCell(field.rowIndex - 1, 0);
            field.component.cellValue(field.rowIndex - 1, 0, field.data.sequence);

            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, (field.data.sequence - 1));

            field.component.saveEditData();
        }
    }

    moveDown(field) {
        if (field.rowIndex < this.buildingsInspected.length - 1) {
            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, field.data.sequence + 1);

            field.component.editCell(field.rowIndex + 1, 0);
            field.component.cellValue(field.rowIndex + 1, 0, field.data.sequence);
            field.component.saveEditData();
        }
    }

    private onAddBuilding() {
        this.popupBuildingSelected.forEach(building => {
            const inspection = {
                idBatch: this.formUserField.data.id,
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

            if (sourceFrom !== 'webusers') {
                this[sourceFrom].splice(find, 1);
            }
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
            const newBuilding = Object.assign([], this[sourceFrom][find]);
            newBuilding.assignedTo = 'all';

            this[sourceTo].push(newBuilding);

            if (sourceFrom !== 'buildings') {
                this[sourceFrom].splice(find, 1);
            }
        }
    }

    private loadWebuser() {
        this.webuserService.getActive().subscribe(data => this.webusers = data);
    }

    private loadBuilding() {
        this.buildingService.getActive().subscribe(data => this.buildings = data);
    }
}
