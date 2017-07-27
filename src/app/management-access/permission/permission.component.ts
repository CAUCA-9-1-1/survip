import {Component, OnInit} from '@angular/core';
import {LanguageService} from 'igo2';

import {PermissionSystemFeature} from '../shared/models/permissionsystemfeature.model';
import {PermissionObjectService} from '../shared/services/permissionobject.service';
import {PermissionObject} from '../shared/models/permissionobject.model';
import {PermissionService} from '../shared/services/permission.service';

@Component({
  selector: 'app-management-access-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.styl'],
  providers: [
    PermissionService,
    PermissionObjectService,
  ]
})
export class PermissionComponent implements OnInit {
  features: PermissionSystemFeature[] = [];
  objects: PermissionObject[] = [];
  editing: object = {};
  filter: object = {};
  labels: object = {};
  defaultLookup: object = {};
  accessLookup: object = {};
  lastPermissionObject: object = {};

  constructor(
    private permissionService: PermissionService,
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
    this.accessLookup = {
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

    const labels = ['yes', 'no', 'seeParent', 'description', 'defaultValue', 'accessValue'];
    this.translate.translate.get(labels).subscribe((result: object) => {
      this.labels = result;
      this.defaultLookup['dataSource'][0]['text'] = result['yes'];
      this.defaultLookup['dataSource'][1]['text'] = result['no'];

      this.accessLookup['dataSource'][0]['text'] = result['seeParent'];
      this.accessLookup['dataSource'][1]['text'] = result['yes'];
      this.accessLookup['dataSource'][2]['text'] = result['no'];
    });
  }

  public ngOnInit() {
    this.loadObject();
  }

  public onRowUpdated(e) {
    if (e.key.idPermission) {
      e.data.idPermission = e.key.idPermission;

      this.permissionService.update(e.data).subscribe();
    } else {
      e.data.idPermissionObject = this.lastPermissionObject['idPermissionObject'];
      e.data.idPermissionSystemFeature = e.key.idPermissionSystemFeature;

      this.permissionService.create(e.data).subscribe();
    }
  }

  public onRowSelected(e) {
    this.lastPermissionObject = e.itemData;
    this.permissionService.get(e.itemData.idPermissionObject).subscribe(data => this.features = data);
  }

  private loadObject() {
    this.objectService.getAll().subscribe(data => this.objects = data);
  }

  private onCalculateDisplayValue(column, data) {
    return (data[column] === true ? this.labels['yes'] : (data[column] === false ? this.labels['no'] : this.labels['seeParent']));
  }
}
