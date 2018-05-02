import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Survey} from '../shared/models/survey.model';
import {SurveyService} from '../shared/services/survey.service';
import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';

@Component({
  selector: 'app-managementsurvey-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [SurveyService]
})
export class ListComponent  extends GridWithCrudService implements OnInit {

  constructor(
    private router: Router,
    surveyService: SurveyService
  ) {
      super(surveyService);
  }

  ngOnInit() {
      this.loadSource();
  }

  getSurveyName(data)  {
      const survey = Survey.fromJSON(data);
      return survey.getLocalization(environment.locale.use);
  }
  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onModifyQuestion(idSurvey) {
    this.router.navigate(['management/survey'], {
      queryParams: {
        id_survey: idSurvey
      }
    });
  }
}
