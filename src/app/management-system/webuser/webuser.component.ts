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
import {GroupModel, ManagementGroupService, ManagementUserService, UserGroupModel, UserPermissionModel} from '@cause-911/management';
import {BreakpointObserver} from '@angular/cdk/layout';
import {UserModel} from '../shared/models/user-model';


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
    private labels = {};
    fireSafetyDepartments: DataSource;
    allFireSafetyDepartments: FireSafetyDepartmentLocalizedModel[] = [];
    showColumnXS = true;
    permissions: PermissionManagement[] = [];
    rules: Object;
    password = '';
    dxForm: any;
    validateOnce = false;
    groups: GroupModel[] = [];
    isPasswordEnabled = false;

    public passwordOptions = {
      readOnly: true,
      onContentReady: (ev) => { this.activeAfterBrowserAutoComplete(ev); },
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
        private managementPermissionService: PermissionManagementService,
        private managementGroupService: ManagementGroupService,
        private managementUserService: ManagementUserService,
        breakpointObserver: BreakpointObserver,
    ) {
        translateService.get([
            'passwordError',
            'all'
        ]).subscribe(labels => {
            this.labels = labels;
        });
        this.rules = { 'X': /[0-9]/ };
      breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.showColumnXS = !result.matches;
      });
        this.getFireSafetyDepartments();
        this.managementPermissionService.getAllPermissions().subscribe(permission => this.permissions = permission);
    }

    ngOnInit() {
          this.getFireSafetyDepartments();
          this.getUsers();
          this.getGroups();
    }

    activeAfterBrowserAutoComplete(e) {
      setTimeout(() => {
        e.component.option('readOnly', false);
      }, 1000);
    }

    onPasswordChanged = (e) => {
      let isPasswordRequired = false;
      const editData = e.validator.option('validationGroup');
      if (editData.type === 'insert' && !e.value) {
        isPasswordRequired = false;
      } else if (editData.type === 'update' && !e.value) {
        isPasswordRequired =  true;
      } else {
        isPasswordRequired =  true;
      }

      let passwordIsValid = false;
      if (e.value && e.value.length < 6) {
        passwordIsValid = false;
      }
      this.password = e.value;
      if (this.validateOnce && this.dxForm) {
        this.dxForm.validate();
      } else {
        this.validateOnce = true;
      }

      return passwordIsValid && isPasswordRequired;
    }

    onFormInitialized = (e) => {
      this.dxForm = e.component;
    }

    onInitNewRow(e) {
        e.data = new UserModel();
    }

    onRowInserted(e) {
      this.saveUser(e.data as UserModel);
    }

    onRowUpdated(e) {
      this.saveUser(e.data as UserModel);
    }

    getUserFireSafetyDepartment(field, e) {
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

  onRowRemoved(e) {
      const user = (e.data as UserModel);

      if (!user.password) {
          user.password = null;
      }

      this.managementUserService.delete(user.id).subscribe(data => {
          this.getUsers();
      });
  }

  private getUsers() {
    this.webuserService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  private saveUser(user: UserModel) {
    if (user.groups) {
      user.groups.forEach(userGroup => {
        userGroup.idUser = user.id;
      });
    }
    if (user.userFireSafetyDepartments) {
      user.userFireSafetyDepartments.forEach(userFireSafetyDepartment => {
        userFireSafetyDepartment.userId = user.id;
      });
    }
    this.webuserService.save(user).subscribe(users => {
        this.getUsers();
    });
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

  isPasswordRequired(e) {
    const editData = e.validator.option('validationGroup');
    if (editData.type === 'insert' && !e.value) {
      return false;
    } else if (editData.type === 'update' && !e.value) {
      return true;
    }
    return true;
  }

  passwordComparison = () => {
    return this.password;
  }

  calculateGroupsDisplayValue = (e) => {
    const userGroups = (e.groups ? e.groups as UserGroupModel[] : []);
    let groupsName: any[] = [];
    userGroups.forEach(userGroup => {
      const index = this.groups.findIndex(c => c.id === userGroup.idGroup);
      if (index !== -1) {
        groupsName.push(this.groups[index].name);
      }
    });
    groupsName = groupsName.sort((one, two) => (one < two ? -1 : 1));
    return groupsName.join(', ');
  }

  getUserGroup(field, e) {
    const groups: string[] = [];

    if (field.value) {
      field.value.forEach((userGroup: UserGroupModel) => {
        groups.push(userGroup.idGroup);
      });
    }

    e.component.option('value', groups);
  }

  setUserGroup(field, e) {
    const userGroup: UserGroupModel[] = [];

    e.value.forEach(idGroup => {
      const groupIndex = (field.value || []).findIndex(u => u.idGroup === idGroup);

      if (groupIndex === -1) {
        userGroup.push({ idGroup, } as UserGroupModel);
      } else {
        userGroup.push(field.value[groupIndex]);
      }
    });

    field.setValue( JSON.parse(JSON.stringify(userGroup)));
  }

  private getGroups() {
    this.managementGroupService.getAll().subscribe(groups => this.groups = groups);
  }
}
