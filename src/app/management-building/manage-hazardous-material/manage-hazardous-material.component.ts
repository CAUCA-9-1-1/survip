import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {
    InspectionBuildingHazardousMaterialService
} from '../../inspection-approval/shared/services/inspection-building-hazardous-material.service';
import {BuildingHazardousMaterialService} from '../shared/services/building-hazardous-material.service';
import {HazardousMaterial} from '../shared/models/hazardous-material.model';
import {HazardousMaterialService} from '../shared/services/hazardous-material.service';
import {UnitOfMeasureService} from '../../management-fire-hydrant/shared/services/unit-of-measure.service';
import {UnitOfMeasure} from '../../management-fire-hydrant/shared/models/unit-of-measure.model';
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

    idBuilding: string;
    hazardousMaterials: HazardousMaterial[];
    unitOfMeasures: UnitOfMeasure[];
    tankTypes: any = [];

    constructor(
        private translateService: TranslateService,
        private inspectionService: InspectionBuildingHazardousMaterialService,
        private buildingService: BuildingHazardousMaterialService,
        private hazardousMaterialService: HazardousMaterialService,
        private unitOfMeasureService: UnitOfMeasureService,
    ) {
        super();

        this.translateService.get([
            'unknown', 'underground', 'aboveground'
        ]).subscribe(labels => {
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
        } else if (e.dataField === 'securityPerimeter' || e.dataField === 'otherInformation') {
            e.editorName = 'dxTextArea';
        }
    }

    onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.isActive = true;
    }

    private loadHazardousMaterial() {
        this.hazardousMaterialService.localized().subscribe(data => this.hazardousMaterials = data);
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getCapacity().subscribe(data => this.unitOfMeasures = data);
    }
}
