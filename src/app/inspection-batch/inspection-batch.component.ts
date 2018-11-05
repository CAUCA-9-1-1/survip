import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent, DxPopupComponent} from 'devextreme-angular';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

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

    public inspectionBuildingList: InspectionBuilding[] = [];
    public availableBuildingsDataSource: any = {};
    public selectedBuildingIds: any[] = [];

    popupBuildingVisible = false;
    popupBuildingSelected = [];
    popupButtons: any[];
    editPopup: DxPopupComponent;
    popupEditorOptions = {onKeyDown: e => this.onFormUpdated(e)};

    private popupToolBarItems = [];

    constructor(
        translateService: TranslateService,
        private batchService: InspectionBatchService,
        private webuserService: WebuserService,
        private buildingService: BuildingService,
        private inspectionService: InspectionService,
        private notification: MatSnackBar,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
        super(batchService);
        this.createStore('AvailableBuildingForManagement');
        translateService.get([
            'all', 'addBuildingsToInspection', 'add', 'cancel', 'needInspectorAndBuildingForReadyInspection'
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
      store: new ODataService({
        url: url,
        key: 'idBuilding',
        keyType: 'Guid',
      }),
    };
  }

  civicNumber_customizeText(cellInfo) {
      return cellInfo.value.replace(/^0+/, '');
  }

    setModel(data: any) {
        return InspectionBatch.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource(() => this.autoEditBatch());
        this.loadWebuser();
    }

    onInitNewRow(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = Object.assign([], this.webusers);

        e.data.idWebuserCreatedBy = sessionStorage.getItem('currentWebuser');
        e.data.isReadyForInspection = false;
        e.data.createOn = (new Date());
        e.data.isActive = true;
        this.inspectionBuildingList = [];

        this.inspectorsList = this.inspectorsOn.concat([{
            id: 'all',
            name: this.labels['all'],
        }]);
    }

    onEditingStart(e) {
        this.inspectorsOn = [];
        this.inspectorsOff = [];
        this.loadInspectionBuildingList(e.data.id);

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

        this.inspectorsList = this.inspectorsOn.concat([{
            id: 'all',
            name: this.labels['all'],
        }]);
    }

    popupShown = (e) => {
        this.editPopup = e.component;
        this.managePopupCancelButton(true);
    }

    managePopupCancelButton(isDisabled: boolean) {
        this.popupToolBarItems = this.editPopup['option']('toolbarItems');
        this.popupToolBarItems[1].options.disabled = isDisabled;
        this.editPopup['option']('toolbarItems', this.popupToolBarItems);
    }

    onFormUpdated(e) {
        this.managePopupCancelButton(false);
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
                    e.key.idWebuserAssignedTo === 'all' ? null : e.key.idWebuserAssignedTo
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
        if (field.rowIndex < this.inspectionBuildingList.length - 1) {
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

      console.log('selected', this.selectedBuildingIds);
      console.log('selected', this.selectedBuildingIds[0]);

      const selectedIds = [];
      this.selectedBuildingIds.forEach(selection => selectedIds.push(selection._value));
      console.log('selection', selectedIds);

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

    private loadInspectionBuildingList(idBatch: string) {
      this.batchService.getInspections(idBatch).subscribe(data => {
        this.inspectionBuildingList = data;
        console.log('buildings', data);
      });
    }

    private loadWebuser() {
        this.webuserService.getActive().subscribe(data => this.webusers = data);
    }
}
