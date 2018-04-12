import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Survey} from '../shared/models/survey.model';
import {SurveyService} from '../shared/services/survey.service';

@Component({
  selector: 'app-managementsurvey-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [SurveyService]
})
export class ListComponent  implements OnInit {
  surveys: Survey[] = [];
  surveyTypes: object[] = [];

  constructor(
    private router: Router,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.loadSurvey();
  }

  public onInitNewRow(e) {

  }

  public onRowInserted(e) {

  }

  public onRowUpdated(e) {
    e.data.idSurvey = e.key.idSurvey;

    this.surveyService.update(e.key).subscribe();
  }

  public onRowRemoved(e) {

  }

  public onLanguageModify(idSurvey) {
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
