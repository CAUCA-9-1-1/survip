import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';

@Component({
  selector: 'app-management-address-citytype',
  templateUrl: './citytype.component.html',
  styleUrls: ['./citytype.component.styl'],
  providers: [CityTypeService]
})
export class CityTypeComponent extends DataGrid implements OnInit {
  cityType: CityType[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private cityTypeService: CityTypeService) {
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
