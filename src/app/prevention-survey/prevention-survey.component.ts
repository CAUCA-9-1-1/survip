import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {InspectionService} from '../shared/services/inspection.service';
import {Inspection} from '../shared/interfaces/inspection.interface';

@Component({
  selector: 'app-prevention-survey',
  templateUrl: './prevention-survey.component.html',
  styleUrls: ['./prevention-survey.component.styl']
})
export class PreventionSurveyComponent implements OnInit {
  private inspection: Inspection;
  private address: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private inspectionService: InspectionService
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
    this.address = 'to defined';
  }
}
