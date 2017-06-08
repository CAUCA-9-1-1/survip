import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

import {DataGrid} from '../../core/devextreme/datagrid';
import {Survey} from '../shared/models/survey.model';
import {SurveyService} from '../shared/services/survey.service';

@Component({
  selector: 'app-management-survey-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [SurveyService]
})
export class ListComponent extends DataGrid implements OnInit {
  surveys: Survey[] = [];
  surveyTypeLookup: object = {};
  languages: string[] = environment.languages;
  editing: object = {};
  filter: object = {};

  constructor(private router: Router, private surveyService: SurveyService) {
    super();

    this.surveyTypeLookup = {
      dataSource: [
        {value: 'residential', text: 'residential'},
        {value: 'general', text: 'general'},
        {value: 'agricultural', text: 'agricultural'}
      ],
        displayExpr: 'text',
        valueExpr: 'value'
    };

    this.editing = {
      mode: 'form',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
      form: {
        colCount: 1,
        items: [{
          dataField: 'name',
          isRequired: true
        }, {
          dataField: 'surveyType',
          isRequired: true
        }, {
          dataField: 'isActive',
          editorType: 'dxCheckBox'
        }]
      }
    };
    this.filter = {
      visible: true
    };
  }

  ngOnInit() {
    this.loadSurvey();
  }

  public onRowUpdated(e) {
    for (const i in e.data) {
      if (e.data[i]) {
        e.key[i] = e.data[i];
      }
    }

    this.surveyService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private onLanguageModify(id_survey, lang) {
    const language_code = environment.languages[lang - 3];

    this.router.navigate(['management/survey'], {
      queryParams: {
        id_survey: id_survey,
        language_code: language_code
      }
    });
  }

  private loadSurvey() {
    this.surveyService.getAll().subscribe(infoSurvey => {
      if (!infoSurvey.success) {
        console.error(infoSurvey.error);
      }

      this.surveys = infoSurvey.data;
    });
  }
}
