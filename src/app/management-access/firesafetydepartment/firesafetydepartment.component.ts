import {Component, OnInit} from '@angular/core';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';

@Component({
  selector: 'app-management-access-firesafetydepartment',
  templateUrl: './firesafetydepartment.component.html',
  styleUrls: ['./firesafetydepartment.component.styl'],
  providers: [FireSafetyDepartmentService]
})
export class FireSafetyDepartmentComponent extends EditDatagrid implements OnInit {
  departments: FireSafetyDepartment[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private fireSafetyDepartmentService: FireSafetyDepartmentService) {
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

    this.fireSafetyDepartmentService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.fireSafetyDepartmentService.getAll().subscribe(infoDept => {
      if (!infoDept.success) {
        console.error(infoDept.error);
      }

      this.departments = infoDept.data;
    });
  }
}
