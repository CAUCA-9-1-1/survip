import {Component, OnInit} from '@angular/core';

import {Color} from '../../core/color';
import {Password} from '../../core/password';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {WebuserFireSafetyDepartment} from '../shared/models/webuserfiresafetydepartment.model';
import {WebuserFireSafetyDepartmentService} from '../shared/services/webuserfiresafetydepartment.service';

@Component({
  selector: 'app-management-access-webuser',
  templateUrl: './webuser.component.html',
  styleUrls: ['./webuser.component.styl'],
  providers: [
    FireSafetyDepartmentService,
    WebuserService,
    WebuserFireSafetyDepartmentService,
  ]
})
export class WebuserComponent implements OnInit {
  private selectedPassword: string;
  private selectedIdWebuser: string;

  users: Webuser[] = [];
  departments: FireSafetyDepartment[] = [];
  userDepartments: WebuserFireSafetyDepartment[] = [];

  constructor(
    private departmentService: FireSafetyDepartmentService,
    private webuserService: WebuserService,
    private webuserDeptService: WebuserFireSafetyDepartmentService
  ) { }

  public ngOnInit() {
    this.loadUsers();
    this.loadDepartments();
  }

  public onPasswordChanged = (e) => {
    if (e.value && e.value.length < 8) {
      return false;
    }

    this.selectedPassword = e.value;
    return true;
  }

  public onPasswordCompare = () => {
    return (this.selectedPassword ? this.selectedPassword : null);
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
    e.data.attributes = {
      resetPassword: true
    };
  }

  public onEditorPreparing(e) {
    if (e.dataField === 'password' || e.dataField === 'passwordConfirm') {
      e.editorOptions.mode = 'password';
      e.editorOptions.onKeyUp = (ev) => {
        const password = new Password();
        const color = new Color();
        const input = ev.component.element().find('input').get(0);
        const hue = password.quality(input.value) * 1.2 / 360;
        const rgb = color.hslToRgb(hue, 1, 0.5);

        if (input.value) {
          ev.component.element().find('input').css({
            'background-color': ['rgb(', rgb[0], ',', rgb[1], ',', rgb[2], ')'].join('')
          });
        }
      };
    }
  }

  public onEditingStart(e) {
    e.data.password = '';

    this.loadUserDepartment(e.data.idWebuser);

    this.selectedIdWebuser = e.data.idWebuser;
    this.selectedPassword = '';
  }

  public onRowInserted(e) {
    this.webuserService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadUsers();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idWebuser = e.key.idWebuser;

    this.webuserService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.webuserService.remove(e.key.idWebuser).subscribe();
  }

  public onNewUserDepartment(e) {
    e.data.isActive = true;
    e.data.attributes = {
      resetPassword: true
    };
  }

  public onUserDepartmentInserted(e) {
    e.data.idWebuserFireSafetyDepartment = e.key.idWebuserFireSafetyDepartment;
    e.data.idWebuser = this.selectedIdWebuser;

    this.webuserDeptService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadUserDepartment(this.selectedIdWebuser);
      }
    });
  }

  public onUserDepartmentUpdated(e) {
    for (const i in e.data) {
      if (e.data[i]) {
        e.key[i] = e.data[i];
      }
    }

    this.webuserDeptService.update(e.key).subscribe();
  }

  public onUserDepartmentRemoved(e) {
    this.webuserDeptService.remove(e.key.selectedIdWebuser).subscribe();
  }

  private loadUsers() {
    this.webuserService.getAll().subscribe(data => this.users = data);
  }

  private loadDepartments() {
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  private loadUserDepartment(idWebuser: string) {
    this.webuserDeptService.getByUser(idWebuser).subscribe(data => this.userDepartments = data);
  }
}
