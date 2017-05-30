import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {County} from '../shared/models/county.model';
import {CountyService} from '../shared/services/county.service';

@Component({
  selector: 'app-management-address-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.styl'],
  providers: [CountyService]
})
export class CountyComponent extends EditDatagrid implements OnInit {
  counties: County[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private countyService: CountyService) {
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

    this.countyService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.countyService.getAll().subscribe(infoCounty => {
      if (!infoCounty.success) {
        console.error(infoCounty.error);
      }

      this.counties = infoCounty.data;
    });
  }
}
