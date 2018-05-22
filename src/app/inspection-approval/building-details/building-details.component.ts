import {Component, Input, OnInit} from '@angular/core';

import {ConstructionService} from '../../management-building/shared/services/construction.service';
import {UnitOfMeasureService} from '../../management-fire-hydrant/shared/services/unit-of-measure.service';
import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-details',
    templateUrl: './building-details.component.html',
    styleUrls: ['./building-details.component.scss'],
    providers: [
        InspectionService,
        ConstructionService,
        UnitOfMeasureService,
    ]
})
export class BuildingDetailsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.detail = {};
        this.buildingType = '';
        this.garageType = '';
        this.unitHeight = '';
        this.unitEstimatedWaterFlow = '';
        this.constructionType = '';
        this.fireResistance = '';
        this.sidingType = '';
        this.roofType = '';
        this.roofMaterialType = '';
        this.loadData();
    }

    private idBuilding: string;
    private garageTypes = ['no', 'yes', 'detached'];

    detail: any = {};
    buildingType: string;
    garageType: string;
    unitHeight: string;
    unitEstimatedWaterFlow: string;
    constructionType: string;
    fireResistance: string;
    sidingType: string;
    roofType: string;
    roofMaterialType: string;

    constructor(
        private inspectionService: InspectionService,
        private constructionService: ConstructionService,
        private measureService: UnitOfMeasureService,
    ) { }

    ngOnInit() { }

    loadData() {
        this.inspectionService.getBuildingDetail(this.idBuilding).subscribe(data => {
            this.detail = data;

            this.garageType = this.garageTypes[data.garageType];

            this.constructionService.getBuildingTypes().subscribe(types => {
                types.forEach( type => {
                    if (type.id === data.idBuildingType) {
                        this.buildingType = type.name;
                    }
                });
            });

            this.measureService.getDimension().subscribe( units => {
                units.forEach( unit => {
                    if (unit.id === data.idUnitOfMeasureHeight) {
                        this.unitHeight = unit.name;
                    }
                });
            });

            this.measureService.getRate().subscribe( units => {
                units.forEach( unit => {
                    if (unit.id === data.idUnitOfMeasureEstimatedWaterFlow) {
                        this.unitEstimatedWaterFlow = unit.name;
                    }
                });
            });

            this.constructionService.getConstructionTypes().subscribe(types => {
                types.forEach( type => {
                    if (type.id === data.idConstructionType) {
                        this.constructionType = type.name;
                    }
                });
            });

            this.constructionService.getFireResistanceTypes().subscribe(types => {
                types.forEach( type => {
                    if (type.id === data.idConstructionFireResistanceType) {
                        this.fireResistance = type.name;
                    }
                });
            });

            this.constructionService.getSidingTypes().subscribe(types => {
                types.forEach( type => {
                    if (type.id === data.idBuildingSidingType) {
                        this.sidingType = type.name;
                    }
                });
            });

            this.constructionService.getRoofTypes().subscribe(types => {
                types.forEach( type => {
                    if (type.id === data.idRoofType) {
                        this.roofType = type.name;
                    }
                });
            });

            this.constructionService.getRoofMaterialTypes().subscribe(types => {
                types.forEach( type => {
                    if (type.id === data.idRoofMaterialType) {
                        this.roofMaterialType = type.name;
                    }
                });
            });
        });
    }

}
