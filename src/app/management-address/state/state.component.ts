import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {State} from '../shared/models/state.model';
import {StateService} from '../shared/services/state.service';

@Component({
  selector: 'app-management-address-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.styl'],
  providers: [StateService]
})
export class StateComponent extends DataGrid implements OnInit {
  states: State[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private stateService: StateService) {
    super();

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

  private loadAll() {
    this.stateService.getAll().subscribe(infoState => {
      if (!infoState.success) {
        console.error(infoState.error);
      }

      this.states = infoState.data;
    });
  }
}
