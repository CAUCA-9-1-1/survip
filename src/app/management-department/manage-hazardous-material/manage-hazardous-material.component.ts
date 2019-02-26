import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {
    InspectionBuildingHazardousMaterialService
} from '../../inspection-approval/shared/services/inspection-building-hazardous-material.service';
import {BuildingHazardousMaterialService} from '../shared/services/building-hazardous-material.service';
import {HazardousMaterialService} from '../../management-system/shared/services/hazardous-material.service';
import {UnitOfMeasureService} from '../../management-type-system/shared/services/unit-of-measure.service';
import {BuildingHazardousMaterial} from '../shared/models/building-hazardous-material.model';



@Component({
    selector: 'app-manage-hazardous-material',
    templateUrl: './manage-hazardous-material.component.html',
    styleUrls: ['./manage-hazardous-material.component.scss'],
    providers: [
        InspectionBuildingHazardousMaterialService,
        BuildingHazardousMaterialService,
        HazardousMaterialService,
        UnitOfMeasureService,
    ]
})
export class ManageHazardousMaterialComponent extends GridWithCrudService implements OnInit {
    @Input() service: string;
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.loadData();
    }
    @Input() readOnly: boolean;

    idBuilding: string;
    hazardousMaterials: any = {store: []};
    unitOfMeasures: any = {store: []};
    tankTypes: any = [];
    private labels: any = {};


    constructor(
        protected translateService: TranslateService,
        private inspectionService: InspectionBuildingHazardousMaterialService,
        private buildingService: BuildingHazardousMaterialService,
        private hazardousMaterialService: HazardousMaterialService,
        private unitOfMeasureService: UnitOfMeasureService,
    ) {
        super(translateService);

        this.translateService.get([
            'unknown', 'underground', 'aboveground', 'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;

            this.tankTypes = [{
                id: 0,
                name: labels['unknown'],
            }, {
                id: 1,
                name: labels['underground'],
            }, {
                id: 2,
                name: labels['aboveground'],
            }];
        });
    }

    setModel(data: any) {
        return BuildingHazardousMaterial.fromJSON(data);
    }

    ngOnInit() {
        this.loadHazardousMaterial();
        this.loadUnitOfMeasure();
    }

    loadData() {
        if (!this.idBuilding || !this.service) {
            return null;
        }

        this.sourceService = (this.service === 'building' ? this.buildingService : this.inspectionService);
        this.loadSource(this.idBuilding);
    }

    getMaterialName(data) {
        if (data) {
            return data.number + ' - ' + data.name;
        }
    }

    onEditorPreparing(e) {
        if (e.dataField === 'idHazardousMaterial') {
            e.editorName = 'dxLookup';
            e.editorOptions.closeOnOutsideClick = true;
        } else if (e.dataField === 'securityPerimeter' || e.dataField === 'otherInformation') {
            e.editorName = 'dxTextArea';
        }
        
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.disabled = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.disabled;
                this.setPopupName(e, this.labels['cannotModifyExternalData']);
            } else {
                this.readOnly = false;
            }
        }
    }

    onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.isActive = true;
    }

    private loadHazardousMaterial() {
        this.hazardousMaterialService.localized().subscribe(data => this.hazardousMaterials = {
          store: data,
          select: ['id', 'name', 'number'],
          sort: ['number', 'name'],
        });
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getCapacity().subscribe(data => this.unitOfMeasures = {
          store: data,
          select: ['id', 'name'],
          sort: ['name'],
        });
    }
}
