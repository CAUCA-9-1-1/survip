import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';

@Component({
  selector: 'app-management-building-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.styl'],
  providers: [BuildingService]
})
export class BuildingComponent extends EditDatagrid implements OnInit {
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
    this.loadAll();
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

  private loadAll() {
    this.buildingService.getAll().subscribe(infoBuilding => {
      if (!infoBuilding.success) {
        console.error(infoBuilding.error);
      }
      console.log(infoBuilding);
      this.buildings = infoBuilding.data;
    });
  }
}
