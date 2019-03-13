import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ConstructionService} from '../../management-system/shared/services/construction.service';
import {UnitOfMeasureService} from '../../management-type-system/shared/services/unit-of-measure.service';
import {InspectionBuildingService} from '../shared/services/inspection-building.service';
import {BuildingResume} from '../../management-department/shared/models/building.model';


@Component({
    selector: 'app-building-details',
    templateUrl: './building-details.component.html',
    styleUrls: ['./building-details.component.scss'],
    providers: [
        InspectionBuildingService,
        ConstructionService,
        UnitOfMeasureService,
        TranslateService,
    ]
})
export class BuildingDetailsComponent implements OnInit {
    @Input()
    set building(building: BuildingResume) {
      this.idBuilding = building.id;
      this.currentBuilding = building;
      this.detail = {};
      this.loadData();
    }

    public currentBuilding: any = {};
    private idBuilding: string;
    private isInitialize = false;

    public detail: any = {};
    public garageTypes: any = [];
    public rateUnits: any = [];
    public dimensionUnits: any = [];
    public buildingTypes: any = [];
    public constructionTypes: any = [];
    public fireResistanceTypes: any = [];
    public sidingTypes: any = [];
    public roofTypes: any = [];
    public roofMaterialTypes: any = [];

    public constructor(
        private inspectionBuildingService: InspectionBuildingService,
        private constructionService: ConstructionService,
        private measureService: UnitOfMeasureService,
        translateService: TranslateService,
    ) {
        translateService.get(['no', 'yes', 'detached']).subscribe(labels => {
            this.garageTypes = [{
                id: 0,
                name: labels['no']
            }, {
                id: 1,
                name: labels['yes']
            }, {
                id: 2,
                name: labels['detached']
            }];
        });
    }

    public ngOnInit() {
        this.measureService.getRate().subscribe( units => this.rateUnits = units);
        this.measureService.getDimension().subscribe( units => this.dimensionUnits = units);
        this.constructionService.getBuildingTypes().subscribe(types => this.buildingTypes = types);
        this.constructionService.getConstructionTypes().subscribe(types => this.constructionTypes = types);
        this.constructionService.getFireResistanceTypes().subscribe(types => this.fireResistanceTypes = types);
        this.constructionService.getSidingTypes().subscribe(types => this.sidingTypes = types);
        this.constructionService.getRoofTypes().subscribe(types => this.roofTypes = types);
        this.constructionService.getRoofMaterialTypes().subscribe(types => this.roofMaterialTypes = types);
        this.isInitialize = true;
    }

    public onChange(e) {
        if (this.detail[e.component.option('name')] !== e.component.option('value')) {
            this.detail[e.component.option('name')] = e.component.option('value');

            this.inspectionBuildingService.saveDetail(this.detail).subscribe();
        }
    }

  public onChangeBuilding(e) {
    if (this.currentBuilding[e.component.option('name')] !== e.component.option('value')) {
      this.currentBuilding[e.component.option('name')] = e.component.option('value');
      this.inspectionBuildingService.saveBuilding(this.currentBuilding).subscribe();
    }
  }

    private loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionBuildingService.getDetail(this.idBuilding).subscribe(data => {
            this.detail = data;
        });
    }
}
