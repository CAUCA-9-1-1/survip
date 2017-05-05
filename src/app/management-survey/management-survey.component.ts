import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-survey',
  templateUrl: './management-survey.component.html',
  styleUrls: ['./management-survey.component.styl']
})
export class ManagementSurveyComponent implements OnInit {
  // dataSource: Survey[] = [];
  columns: Object[] = [];
  editing: Object = {
    allowAdding: true,
    allowUpdating: true,
    allowDeleting: true
  };

  constructor() {
    this.columns = [{
      dataField: 'id_survey',
      visible: false,
      dataType: 'string'
    }, {
      caption: 'survey',
      dataField: 'name',
      sortIndex: 1,
      sortOrder: 'asc',
      calculateCellValue: function (data) {
        return (data.name ? data.name.fr : '');
      },
      editCellTemplate: function (cellElement, cellInfo) {
        /*$('<div>').dxMultiLang({
          value: cellInfo.data.name,
          onValueChanged: function (e) {
            cellInfo.setValue(e.value);
          }
        }).appendTo(cellElement);*/
      }
    }, {
      caption: 'surveyType',
      dataField: 'survey_type',
      lookup: {
        dataSource: [{
          value: 'residential',
          text: 'residential'
        }, {
          value: 'general',
          text: 'general'
        }, {
          value: 'agricultural',
          text: 'agricultural'
        }],
        displayExpr: 'text',
        valueExpr: 'value'
      }
    }, {
      caption: 'isActive',
      dataField: 'is_active',
      dataType: 'boolean',
      filterValue: true
    }];
  }

  ngOnInit() {
  }

  onRowUpdated() {

  }
}
