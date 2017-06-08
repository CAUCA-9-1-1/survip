import {Component, OnInit} from '@angular/core';
import {LanguageService} from 'igo2';

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
  editing: object = {};
  filter: object = {};
  labels: object = {};
  defaultLookup: object = {};
  webuserLookup: object = {};

  constructor(
    private featureService: PermissionWebuserService,
    private objectService: PermissionObjectService,
    private translate: LanguageService
  ) {
    this.defaultLookup = {
      dataSource: [
        {'value': true, 'text': 'yes'},
        {'value': false, 'text': 'no'}
      ],
      displayExpr: 'text',
      valueExpr: 'value'
    };
    this.webuserLookup = {
      dataSource: [
        {'value': null, 'text': 'seeParent'},
        {'value': true, 'text': 'yes'},
        {'value': false, 'text': 'no'}
      ],
      displayExpr: 'text',
      valueExpr: 'value'
    };

    this.editing = {
      mode: 'cell',
      allowUpdating: true,
      // allowAdding: true,
      // allowDeleting: true,
    };
    this.filter = {
      visible: true
    };

    const labels = ['yes', 'no', 'seeParent', 'description', 'defaultValue', 'webuserValue'];
    this.translate.translate.get(labels).subscribe((result: object) => {
      this.labels = result;
      this.defaultLookup['dataSource'][0]['text'] = result['yes'];
      this.defaultLookup['dataSource'][1]['text'] = result['no'];

      this.webuserLookup['dataSource'][0]['text'] = result['seeParent'];
      this.webuserLookup['dataSource'][1]['text'] = result['yes'];
      this.webuserLookup['dataSource'][2]['text'] = result['no'];
    });
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

    this.featureService.update(e.key).subscribe();
  }

  public onRowSelected(e) {
    this.featureService.get(e.itemData.idPermissionObject).subscribe(infoFeature => {
      this.features = infoFeature.data;
    });
  }

  private loadObject() {
    this.objectService.getAll().subscribe(infoObject => {
      this.objects = infoObject.data;
    });
  }

  private onCalculateDisplayValue(column, data) {
    return (data[column] === true ? this.labels['yes'] : (data[column] === false ? this.labels['no'] : this.labels['seeParent']));
  }
}
