import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {Password} from '../../shared/classes/password';
import {Color} from '../../shared/classes/color';
import {UserFireSafetyDepartmentModel} from '../shared/models/user-fire-safety-department-model';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {FireSafetyDepartmentLocalizedModel} from '../shared/models/fire-safety-department-localized-model';
import {PermissionManagementService} from '../shared/services/permission-management.service';
import {PermissionManagement} from '../shared/models/permission-management';
import {UserPermissionModel} from '@cause-911/management';


@Component({
    selector: 'app-management-system-webuser',
    templateUrl: './webuser.component.html',
    styleUrls: ['./webuser.component.scss'],
    providers: [
        FireSafetyDepartmentService,
        WebuserService,
    ]
})
export class WebuserComponent implements OnInit {
    users: Webuser[] = [];
    private selectedPassword: string;
    private selectedIdWebuser: string;
    private labels = {};
    fireSafetyDepartments: DataSource;
    allFireSafetyDepartments: FireSafetyDepartmentLocalizedModel[] = [];
    showColumnXS = true;
    permissions: PermissionManagement[] = [];
    rules: Object;

    public passwordOptions = {
        onKeyUp: (ev) => {
            const password = new Password();
            const color = new Color();
            const input = ev.component.element().querySelector('input');
            const hue = password.quality(input.value) * 1.2 / 360;
            const rgb = color.hslToRgb(hue, 1, 0.5);

            if (input.value) {
                input.style.backgroundColor = ['rgb(', rgb[0], ',', rgb[1], ',', rgb[2], ')'].join('');
            }
        },
        onInitialized: (ev) => {
            ev.component.option('mode', 'password');
        }
    };
    public readOnlyImported = !this.departmentService.readOnlyImported;

    constructor(
        private webuserService: WebuserService,
        protected translateService: TranslateService,
        private departmentService: FireSafetyDepartmentService,
        private managementPermissionService: PermissionManagementService
    ) {
        translateService.get([
            'passwordError',
            'all'
        ]).subscribe(labels => {
            this.labels = labels;
        });
        this.rules = { 'X': /[0-9]/ };
        this.getFireSafetyDepartments();
        this.managementPermissionService.getAllPermissions().subscribe(permission => this.permissions = permission);
    }

    ngOnInit() {
        this.getFireSafetyDepartments();
        this.getUsers();
    }

    getFirstname = (e) => {
      return e.firstName;
    }

    getLastname = (e) => {
        return e.lastName;
    }

    getEmail = (e) => {
        return e.email;
    }

    getTelephone = (e) => {
        return e.phoneNumber;
    }

    onPasswordChanged = (e) => {
        if (e.value && e.value.length < 8) {
            return false;
        }

        this.selectedPassword = e.value;
        return true;
    }

    onPasswordCompare = (e) => {
        return (this.selectedPassword ? this.selectedPassword : null);
    }

    isDepartmentValid(): boolean {
        return true;
    }

    onEditorPreparing(e) {
    }

    onInitNewRow(e) {
        e.data = new Webuser();
    }

    onEditingStart(e) {
        e.data.password = '';
        e.data.resetPassword = this.getWebuserAttribute('reset_password', e.data);
        this.selectedIdWebuser = e.data.id;
        this.selectedPassword = '';
    }

    onRowInserted(e) {
      this.saveUser(e.data as Webuser);
    }

    onRowUpdated(e) {
      this.saveUser(e.data as Webuser);
    }

    private getWebuserAttribute(field, e) {
        let name = '';

        if (e.attributes) {
            e.attributes.forEach(attribute => {
                if (attribute.attributeName === field) {
                    name = attribute.attributeValue;
                }
            });
        }
        return name;
    }

    getUserFireSafetyDepartment(field, e) {
      console.log(e);
      const userFireSafetyDepartments: string[] = [];
      if (field.value) {
        field.value.forEach((userFireSafetyDepartment: UserFireSafetyDepartmentModel) => {
          userFireSafetyDepartments.push(userFireSafetyDepartment.fireSafetyDepartmentId);
        });
      }
      e.component.option('value', userFireSafetyDepartments);
    }

  setUserFireSafetyDepartment(field, e) {
    const userFireSafetyDepartments: UserFireSafetyDepartmentModel[] = [];
    const fireSafetyDepartmentIds: string[] = [];
    e.value.forEach(fireSafetyDepartmentId => {
      const fireSafetyDepartmentIndex = (field.value || []).findIndex(u => u.fireSafetyDepartmentId === fireSafetyDepartmentId);
      fireSafetyDepartmentIds.push(fireSafetyDepartmentId);
      if (fireSafetyDepartmentIndex === -1) {
        userFireSafetyDepartments.push({ fireSafetyDepartmentId, } as UserFireSafetyDepartmentModel);
      } else {
        userFireSafetyDepartments.push(field.value[fireSafetyDepartmentIndex]);
      }
    });
    field.setValue(JSON.parse(JSON.stringify(userFireSafetyDepartments)));
  }

  private getFireSafetyDepartments() {
    this.departmentService.allLocalizedForUser().subscribe(fireSafetyDepartments => {
      this.allFireSafetyDepartments = fireSafetyDepartments;
      this.fireSafetyDepartments = new DataSource({
        pageSize: 25,
        store: new ArrayStore({
          data: fireSafetyDepartments,
          key: 'id'
        }),
        map: function(item) {
          return item;
        },
      });
    });
  }

  calculateFireSafetyDepartmentsDisplayValue = (e) => {
    const userFireSafetyDepartments = (e.userFireSafetyDepartments ? e.userFireSafetyDepartments as UserFireSafetyDepartmentModel[] : []);
    let fireSafetyDepartmentsName: any[] = [];
    userFireSafetyDepartments.forEach(userFireSafetyDepartment => {
      const fireSafetyDepartment = this.allFireSafetyDepartments.filter(f => f.id === userFireSafetyDepartment.fireSafetyDepartmentId);
      if (fireSafetyDepartment && fireSafetyDepartment[0]) {
        fireSafetyDepartmentsName.push(fireSafetyDepartment[0].name);
      }
    });
    fireSafetyDepartmentsName = fireSafetyDepartmentsName.sort((one, two) => (one < two ? -1 : 1));
    return fireSafetyDepartmentsName.join(', ');
  }

  onRowRemoved(e){}

  private getUsers() {
    this.webuserService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  private saveUser(user: Webuser) {
    if (user.groups) {
      user.groups.forEach(userGroup => {
        userGroup.idUser = user.id;
      });
    }
    user.fireSafetyDepartments.forEach(userFireSafetyDepartment => {
      userFireSafetyDepartment.userId = user.id;
    });
    /*this.managementUserService.saveUser(user).subscribe(data => {
      this.getUsers();
    });*/
  }

  getPermissionStatus(field, permission, e) {
    const userPermission = (field.value || []).find(p => p.idModulePermission === permission.id);

    if (userPermission) {
      e.component.option('value', userPermission.isAllowed);
    } else {
      e.component.option('value', undefined);
    }
  }

  checkBoxToggled(field, permission, e) {
    if (e.component.skipOnValueChanged) {
      e.component.skipOnValueChanged = false;
      return;
    }
    if (e.component.setUndefinedNextTime) {
      e.component.setUndefinedNextTime = false;
      e.component.skipOnValueChanged = true;
      e.component.option('value', undefined);
      this.setPermissionStatus(field, permission, undefined);
      return;
    }
    if (e.value === false) {
      e.component.setUndefinedNextTime = true;
    }

    this.setPermissionStatus(field, permission, e.value);
  }

  private setPermissionStatus(field, permission, value) {
    const userPermissions = field.value || [];
    const groupIndex = userPermissions.findIndex(p => p.idModulePermission === permission.id);

    if (groupIndex > -1) {
      userPermissions[groupIndex].isAllowed = value;
    } else {
      userPermissions.push({
        idModulePermission: permission.id,
        isAllowed: value,
      } as UserPermissionModel);
    }

    field.setValue(JSON.parse(JSON.stringify(userPermissions)));
  }
}
