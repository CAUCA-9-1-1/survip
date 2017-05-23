import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {InspectionService} from '../shared/services/inspection.service';
import {Inspection} from '../shared/interfaces/inspection.interface';
import {BuildingService} from '../shared/services/building.service';

@Component({
  selector: 'app-prevention-survey',
  templateUrl: './prevention-survey.component.html',
  styleUrls: ['./prevention-survey.component.styl'],
  providers: [BuildingService]
})
export class PreventionSurveyComponent implements OnInit {
  private inspection: Inspection;

  get address(): string { return this._address; };
  private _address;

  constructor(
    private activeRoute: ActivatedRoute,
    private inspectionService: InspectionService,
    private buildingService: BuildingService
  ) {
    this.activeRoute.params.subscribe((params: Params) => {
      this.inspectionService.get(params.id).subscribe((inspect) => {
        this.inspection = inspect;
        this.loadBuilding();
      });
    });
  }

  ngOnInit() {

  }

  loadBuilding() {
    this.buildingService.get(this.inspection.idBuilding).subscribe((building) => {
      this._address = building.address;
    });
  }
}
