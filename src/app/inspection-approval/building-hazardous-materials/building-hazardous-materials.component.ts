import {Component, Input, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {InspectionBuildingHazardousMaterialService} from '../shared/services/inspection-building-hazardous-material.service';
import {BuildingHazardousMaterial} from '../../management-building/shared/models/building-hazardous-material.model';
import {HazardousMaterialService} from '../../management-building/shared/services/hazardous-material.service';
import {UnitOfMeasureService} from '../../management-fire-hydrant/shared/services/unit-of-measure.service';
import {HazardousMaterial} from '../../management-building/shared/models/hazardous-material.model';
import {UnitOfMeasure} from '../../management-fire-hydrant/shared/models/unit-of-measure.model';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-building-hazardous-materials',
    templateUrl: './building-hazardous-materials.component.html',
    styleUrls: ['./building-hazardous-materials.component.scss'],
    providers: [
        InspectionBuildingHazardousMaterialService,
        HazardousMaterialService,
        UnitOfMeasureService,
    ]
})
export class BuildingHazardousMaterialsComponent extends GridWithCrudService implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.dataSource = [];

        if (this.idBuilding) {
            this.loadSource(this.idBuilding);
        }
    }

    public hazardousMaterials: HazardousMaterial[];
    public unitOfMeasures: UnitOfMeasure[];
    public tankTypes: any = [];
    private idBuilding: string;

    public constructor(
        inspectionBuildingHazardousMaterialService: InspectionBuildingHazardousMaterialService,
        private hazardousMaterialService: HazardousMaterialService,
        private unitOfMeasureService: UnitOfMeasureService,
        private translateService: TranslateService,
    ) {
        super(inspectionBuildingHazardousMaterialService);

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

    public ngOnInit() {
        this.loadHazardousMaterial();
        this.loadUnitOfMeasure();
    }

    public setModel(data: any) {
        return BuildingHazardousMaterial.fromJSON(data);
    }

    public getMaterialName(data) {
        if (data) {
            return data.number + ' - ' + data.name;
        }
    }

    public validateUnitOfMeasure(e) {
        const validationGroup = e.validator.option('validationGroup');

        if ('capacityContainer' in validationGroup.data) {
            return (validationGroup.data.capacityContainer && e.value ? true : false);
        } else if (validationGroup.key.capacityContainer) {
            return (e.value ? true : false);
        }

        return true;
    }

    public onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.isActive = true;
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'idHazardousMaterial') {
            e.editorName = 'dxLookup';
            e.editorOptions.closeOnOutsideClick = true;
        } else if (e.dataField === 'securityPerimeter' || e.dataField === 'otherInformation') {
            e.editorName = 'dxTextArea';
        }
    }

    private loadHazardousMaterial() {
        this.hazardousMaterialService.localized().subscribe(data => {
            data.sort((mat1, mat2) => {
                return mat1.number > mat2.number ? 1 : -1;
            });
            this.hazardousMaterials = data;
        });
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getCapacity().subscribe(data => this.unitOfMeasures = data);
    }
}
