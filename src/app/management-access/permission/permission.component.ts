import {Component, OnInit} from '@angular/core';

import {PermissionWebuser} from '../shared/models/permissionwebuser.model';
import {PermissionWebuserService} from '../shared/services/permissionwebuser.service';
import {PermissionObjectService} from '../shared/services/permissionobject.service';
import {PermissionObject} from '../shared/models/permissionobject.model';

@Component({
  selector: 'app-management-access-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.styl'],
  providers: [
    PermissionWebuserService,
    PermissionObjectService
  ]
})
export class PermissionComponent implements OnInit {
  features: PermissionWebuser[] = [];
  objects: PermissionObject[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(
    private featureService: PermissionWebuserService,
    private objectService: PermissionObjectService
  ) {
    this.columns = [{
      dataField: 'description',
      caption: 'description'
    }, {
      dataField: 'defaultValue',
      caption: 'defaultValue',
      width: '20%',
      lookup: {
        dataSource: [
          {'value': true, 'text': 'yes'},
          {'value': false, 'text': 'no'}
        ],
        displayExpr: 'text',
        valueExpr: 'value'
      },
      calculateDisplayValue: this.onCalculateDisplayValue.bind(this, 'defaultValue')
    }, {
      dataField: 'webuserValue',
      caption: 'webuserValue',
      width: '20%',
      lookup: {
        dataSource: [
          {'value': null, 'text': 'seeParent'},
          {'value': true, 'text': 'yes'},
          {'value': false, 'text': 'no'}
        ],
        displayExpr: 'text',
        valueExpr: 'value'
      },
      calculateDisplayValue: this.onCalculateDisplayValue.bind(this, 'webuserValue')
    }];

    this.editing = {
      mode: 'cell',
      allowUpdating: true,
      // allowAdding: true,
      // allowDeleting: true,
    };
    this.filter = {
      visible: true
    };
  }

  public ngOnInit() {
    this.loadObject();
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

    this.featureService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  public onRowSelected(e) {
    this.featureService.get(e.itemData.idPermissionObject).subscribe(infoFeature => {
      if (!infoFeature.success) {
        console.error(infoFeature.error);
      }

      this.features = infoFeature.data;
    });
  }

  private loadObject() {
    this.objectService.getAll().subscribe(infoObject => {
      if (!infoObject.success) {
        console.error(infoObject.error);
      }

      this.objects = infoObject.data;
    });
  }

  private onCalculateDisplayValue(column, data) {
    return (data[column] === true ? 'yes' : (data[column] === false ? 'no' : 'seeParent'));
  }
}
