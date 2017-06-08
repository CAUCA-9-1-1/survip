import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {RegionService} from '../shared/services/region.service';
import {Region} from '../shared/models/region.model';

@Component({
  selector: 'app-management-address-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.styl'],
  providers: [RegionService]
})
export class RegionComponent extends DataGrid implements OnInit {
  regions: Region[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private regionService: RegionService) {
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
