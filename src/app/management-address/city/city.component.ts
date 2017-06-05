import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';

@Component({
  selector: 'app-management-address-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.styl'],
  providers: [CityService]
})
export class CityComponent extends EditDatagrid implements OnInit {
  cities: City[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private cityService: CityService) {
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

    this.cityService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.cityService.getAll().subscribe(infoCity => {
      if (!infoCity.success) {
        console.error(infoCity.error);
      }

      this.cities = infoCity.data;
    });
  }
}
