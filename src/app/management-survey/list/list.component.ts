import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {DevextremeDatagrid} from 'cause-lib';
import {Survey} from '../shared/models/survey.model';
import {SurveyService} from '../shared/services/survey.service';

@Component({
  selector: 'app-management-survey-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [SurveyService]
})
export class ListComponent extends DevextremeDatagrid implements OnInit {
  surveys: Survey[] = [];
  surveyTypes: object[] = [];

  constructor(
    private router: Router,
    private surveyService: SurveyService
  ) {
    super();
  }

  ngOnInit() {
    this.loadSurvey();
  }

  public onRowUpdated(e) {
    e.data.idSurvey = e.key.idSurvey;

    this.surveyService.update(e.key).subscribe();
  }

  private onModified(idSurvey) {
    this.router.navigate(['management/survey'], {
      queryParams: {
        id_survey: idSurvey
      }
    });
  }

  private loadSurvey() {
    this.surveyService.getAll().subscribe(data => this.surveys = data);
  }
}
