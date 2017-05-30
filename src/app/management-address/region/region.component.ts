import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {RegionService} from '../shared/services/region.service';
import {Region} from '../shared/models/region.model';

@Component({
  selector: 'app-management-address-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.styl'],
  providers: [RegionService]
})
export class RegionComponent extends EditDatagrid implements OnInit {
  regions: Region[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private regionService: RegionService) {
    super();

    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
    }, {
      dataField: 'code',
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
          dataField: 'code'
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

    this.regionService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.regionService.getAll().subscribe(infoRegion => {
      if (!infoRegion.success) {
        console.error(infoRegion.error);
      }

      this.regions = infoRegion.data;
    });
  }
}
