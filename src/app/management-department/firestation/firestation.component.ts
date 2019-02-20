import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {FirestationService} from '../shared/services/firestation.service';
import {FireSafetyDepartmentService} from '../../management-system/shared/services/firesafetydepartment.service';
import {FireSafetyDepartment} from '../../management-system/shared/models/firesafetydepartment.model';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {Firestation} from '../shared/models/firestation.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-department-firestation',
    templateUrl: './firestation.component.html',
    styleUrls: ['./firestation.component.scss'],
    providers: [
        FirestationService,
        FireSafetyDepartmentService,
        BuildingService,
    ]
})
export class FirestationComponent extends GridWithCrudService implements OnInit {
    departments: any = {store: []};
    buildings: Building[] = [];
    buildingLookup: {
        closeOnOutsideClick: true,
    };
    public phoneEditorOptions = {mask : '(000) 000-0000', maskRules : { X: /[02-9]/ }, maxlength: 10, useMaskedValue: true };
    private labels: any = {};
    
    constructor(
        firestationService: FirestationService,
        private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private buildingService: BuildingService,
        private translateService: TranslateService
    ) {
        super(firestationService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }
    
    public readOnlyImported = !this.buildingService.readOnlyImported;

    public setModel(data: any) {
        return Firestation.fromJSON(data);
    }

    public ngOnInit() {
        this.loadSource();
        this.loadDepartment();
        this.loadBuilding();
    }

    public getBuildingName(data) {
        return data.civicNumber + ' ' + data.lane + ', ' + data.city + (data.name ? ' (' + data.name + ')' : '');
    }

    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            e.editorOptions.disabled = e.row.data.idExtern != null;
            this.setPopupName(e, this.labels['cannotModifyExternalData']);

        }
        if (e.dataField === 'idBuilding') {
            e.editorName = 'dxLookup';
            e.editorOptions.valueExpr = 'id';
            e.editorOptions.displayExpr = (item) => {
                if (item) {
                    return item.civicNumber + ' ' + item.lane + ', ' + item.city;
                }
            };
            e.editorOptions.dataSource = this.buildings;
            e.editorOptions.closeOnOutsideClick = true;
        }

        if (e.dataField === 'idFireSafetyDepartment') {
            const defaultValueChanged = e.editorOptions.onValueChanged;
            e.editorOptions.onValueChanged = ev => {
                this.loadBuilding(ev.value);
                defaultValueChanged(ev);
            };
        }
    }

    public onInitNewRow(e) {
        e.data.isActive = true;
        this.loadDepartment();
    }

    public onEditingStart(e) {
        this.loadDepartment();
    }

    private loadDepartment() {
        this.fireSafetyDepartmentService.localized().subscribe(data => {
            this.departments = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadBuilding(idFireSafetyDepartment: string = '') {
        if (idFireSafetyDepartment) {
            this.buildingService.getActiveForFireSafetyDepartment(idFireSafetyDepartment).subscribe(data => {
                this.buildings = data;
            });
        } else {
            this.buildingService.getActive().subscribe(data => {
                this.buildings = data;
            });
        }

    }
}
