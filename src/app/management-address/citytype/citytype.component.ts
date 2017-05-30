import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';

@Component({
  selector: 'app-management-address-citytype',
  templateUrl: './citytype.component.html',
  styleUrls: ['./citytype.component.styl'],
  providers: [CityTypeService]
})
export class CityTypeComponent extends EditDatagrid implements OnInit {
  cityType: CityType[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private cityTypeService: CityTypeService) {
    super();

    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
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

    this.cityTypeService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.cityTypeService.getAll().subscribe(infoCityType => {
      if (!infoCityType.success) {
        console.error(infoCityType.error);
      }

      this.cityType = infoCityType.data;
    });
  }
}
