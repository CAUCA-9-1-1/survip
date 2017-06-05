import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-management-survey',
  templateUrl: './management-survey.component.html',
  styleUrls: ['./management-survey.component.styl']
})
export class ManagementSurveyComponent implements OnInit {
  public selectedSurvey = null;

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.id_survey) {
        this.selectedSurvey = params.id_survey;
      }
    });
  }

  ngOnInit() {
  }
}
