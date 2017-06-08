import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';

@Component({
  selector: 'app-management-building-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    BuildingService,
  ]
})
export class ListComponent extends DataGrid implements OnInit {
  buildings: Building[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private buildingService: BuildingService) {
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
          dataField: 'idLane'
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
    this.loadBuiling();
  }

  public onRowUpdated(e) {
    for (const i in e.data) {
      if (e.data[i]) {
        e.key[i] = e.data[i];
      }
    }

    this.buildingService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadBuiling() {
    this.buildingService.getAll().subscribe(infoBuilding => {
      if (!infoBuilding.success) {
        console.error(infoBuilding.error);
      }

      this.buildings = infoBuilding.data;
    });
  }
}
