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
    inspectors: WebuserForWeb[] = [];
    inspectorsList: WebuserForWeb[] = [];
    buildings: Building[] = [];
    buildingInspected: Building[] = [];

    constructor(
        translateService: TranslateService,
        batchService: InspectionBatchService,
        private webuserService: WebuserService,
        private buildingService: BuildingService,
    ) {
        super(batchService);

        translateService.get(['all']).subscribe(data => {
            this.labels = data;
        });
    }

    ngOnInit() {
        this.loadSource();
        this.loadWebuser();
        this.loadBuilding();
    }

    onInitNewRow(e) {
        this.inspectors = [];
        this.buildingInspected = [];

        e.data.isActive = true;
    }

    onEditingStart(e) {
        this.inspectors = [];
        this.buildingInspected = [];

        e.data.users.forEach(inspector => {
            this.webusers.forEach(user => {
                if (user.id === inspector.idWebuser) {
                    this.inspectors.push(Object.assign({}, user));
                }
            });
        });
        e.data.inspections.forEach(inspection => {
            this.buildings.forEach(building => {
                if (building.id === inspection.idBuilding) {
                    building = Object.assign({
                        assignedTo: inspection.idWebuserAssignedTo || 'all'
                    }, building);

                    this.buildingInspected.push(building);
                }
            });
        });

        this.inspectorsList = this.inspectors.concat([{
            id: 'all',
            name: this.labels['all'],
        }]);
    }

    setFormUserField(field) {
        this.formUserField = field;
    }

    setFormInspectionField(field) {
        this.formInspectionField = field;
    }

    addInspector(e, field) {
        const inspector = Object.assign({}, e.selectedItem);
        const users = this.formUserField.value;

        if ('id' in inspector) {
            this.inspectors.push(inspector);

            users.push({
                idWebuser: inspector.id,
                idBatch: this.formUserField.data.id,
            });

            this.formUserField.setValue(users);
            e.component.option('value', '');
        }
    }

    removeInspector(item) {
        let findInspector = -1;
        let findWebuser = -1;

        this.inspectors.forEach((inspector, index) => {
            if (inspector.id === item.id) {
                findInspector = index;
            }
        });
        this.formUserField.value.forEach((user, index) => {
            if (user.idWebuser === item.id) {
                findWebuser = index;
            }
        });

        if (findInspector > -1) {
            this.inspectors.splice(findInspector, 1);
        }
        if (findWebuser > -1) {
            this.formUserField.value.splice(findWebuser, 1);
            this.formUserField.setValue(this.formUserField.value);
        }
    }

    onBuildingsRemoved(item) {
        let find = -1;

        this.buildingInspected.forEach((inspector, index) => {
            if (inspector.id === item.id) {
                find = index;
            }
        });

        if (find > -1) {
            this.buildingInspected.splice(find, 1);
        }
    }

    onBuildingsUpdated(item) {
        this.formInspectionField.data.inspections.forEach((inspection, index) => {
            if (inspection.idBuilding === item.key.id) {
                this.formInspectionField.data.inspections[index].idWebuserAssignedTo = (item.key.assignedTo === 'all' ? null : item.key.assignedTo);
            }
        });

        this.formInspectionField.setValue(this.formInspectionField.data.inspections);
    }

    private loadWebuser() {
        this.webuserService.getActive().subscribe(data => this.webusers = data);
    }

    private loadBuilding() {
        this.buildingService.getActive().subscribe(data => this.buildings = data);
    }
}
