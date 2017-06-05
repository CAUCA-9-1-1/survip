import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';

@Component({
  selector: 'app-management-address-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.styl'],
  providers: [LaneService]
})
export class LaneComponent extends EditDatagrid implements OnInit {
  lanes: Lane[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private laneService: LaneService) {
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

    this.laneService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.laneService.getAll().subscribe(infoLane => {
      if (!infoLane.success) {
        console.error(infoLane.error);
      }

      this.lanes = infoLane.data;
    });
  }
}
