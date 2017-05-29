import {Component, OnInit} from '@angular/core';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';

@Component({
  selector: 'app-management-address-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.styl'],
  providers: [StateService]
})
export class StateComponent implements OnInit {
  states: State[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private stateService: StateService) {
    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
    }, {
      dataField: 'ansiCode',
      caption: 'code'
    }, {
      dataField: 'isActive',
      dataType: 'boolean',
      caption: 'isActive',
      width: '10%'
    }];

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
          dataField: 'ansiCode'
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

  public ngOnInit() {
    this.loadAll();
  }

  /* ngOnChanges() {
    console.log('change');
  }*/

  public onRowUpdated(e) {
    for (const i in e.data) {
      if (e.data[i]) {
        e.key[i] = e.data[i];
      }
    }

    this.stateService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private onCalculateCellValue(data) {
    return (data.name ? data.name['fr'] : '');
  }

  private onEditCellTemplate(cellElement, cellInfo) {
    /*$('<div>').dxMultiLang({
      value: cellInfo.data.name,
      onValueChanged: function (e) {
        cellInfo.setValue(e.value);
      }
    }).appendTo(cellElement);*/
  }

  private loadAll() {
    this.stateService.getAll().subscribe(infoState => {
      if (!infoState.success) {
        console.error(infoState.error);
      }

      this.states = infoState.data;
    });
  }
}
