import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LanguageService} from 'igo2';
import {environment} from 'environments/environment';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {Survey} from '../shared/models/survey.model';
import {SurveyService} from '../shared/services/survey.service';

@Component({
  selector: 'app-management-survey-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [SurveyService]
})
export class ListComponent extends EditDatagrid implements OnInit {
  surveys: Survey[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private router: Router, private surveyService: SurveyService, private translate: LanguageService) {
    super();

    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
    }, {
      dataField: 'surveyType',
      caption: 'surveyType',
      lookup: {
        dataSource: [
          {value: 'residential', text: 'residential'},
          {value: 'general', text: 'general'},
          {value: 'agricultural', text: 'agricultural'}
        ],
        displayExpr: 'text',
        valueExpr: 'value'
      }
    }, {
      dataField: 'isActive',
      dataType: 'boolean',
      caption: 'isActive',
      width: '10%'
    }];

    const nb = environment.languages.length;
    for (let i = 0; i < nb; i++) {
      this.columns.push({
        alignment: 'center',
        caption: environment.languages[i],
        cellTemplate: 'editByLanguage'
      });
    }

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

    this.translate.translate.get(['name', 'surveyType', 'isActive'].concat(environment.languages)).subscribe((result: object) => {
      this.columns[0]['caption'] = result['name'];
      this.columns[1]['caption'] = result['surveyType'];
      this.columns[2]['caption'] = result['isActive'];

      for (let i = 0; i < nb; i++) {
        this.columns[(i + 3)]['caption'] = result[environment.languages['nb']];
      }
    });
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
