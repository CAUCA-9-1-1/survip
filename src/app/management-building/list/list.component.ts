import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';

@Component({
  selector: 'app-management-building-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    BuildingService
  ]
})
export class ListComponent extends EditDatagrid implements OnInit {
  buildings: Building[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private buildingService: BuildingService) {
    super();

    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
    }, {
      dataField: 'address',
      caption: 'address'
    }, {
      dataField: 'isParent',
      dataType: 'boolean',
      caption: 'isParent',
      width: '10%'
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
