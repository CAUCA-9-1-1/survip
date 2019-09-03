import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {Password} from '../../shared/classes/password';
import {Color} from '../../shared/classes/color';
import {UserFireSafetyDepartmentModel} from '../shared/models/user-fire-safety-department-model';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

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
    private departmentField: any;
    fireSafetyDepartments: DataSource;
    allFireSafetyDepartments: FireSafetyDepartment[] = [];
    showColumnXS = true;

    public displayDepartmentValidationError = false;
    public departments: any = {store: []};
    public webuserFireSafetyDepartments = [];
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
    ) {
        translateService.get([
            'passwordError',
            'all'
        ]).subscribe(labels => {
            this.labels = labels;
        });
        this.getFireSafetyDepartments();
    }

    ngOnInit() {
        this.loadDepartments();
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
        e.data.isActive = true;
        e.data.resetPassword = true;
        e.data.fireSafetyDepartments = [];
        e.data.username = ' ';
        e.data.password = '';
        e.data.passwordConfirm = '';

        this.webuserFireSafetyDepartments = [];
        this.selectedIdWebuser = undefined;
        this.selectedPassword = '';
    }

    onEditingStart(e) {
      console.log(e);
        e.data.password = '';
        e.data.resetPassword = this.getWebuserAttribute('reset_password', e.data);
        // this.webuserFireSafetyDepartments = e.data.fireSafetyDepartments;
        this.selectedIdWebuser = e.data.id;
        this.selectedPassword = '';
    }

    onRowInserted(e) {

       // e.data.attributes = this.setWebuserAttributes(e);

       // super.onRowInserted(e);
    }

    onRowUpdated(e) {
       // e.key.attributes = this.setWebuserAttributes(e);

      //  super.onRowUpdated(e);
    }

    ondRowValidating(e) {
        if (!e.isValid && e.brokenRules[0].type === 'compare' && !e.newData.password) {
            e.isValid = true;
        }

        e.isValid = this.isDepartmentValid();
    }

   /* private setWebuserAttributes(e) {
        const fieldUser = ['__KEY__', 'id', 'createOn', 'isActive', 'password', 'username', 'fireSafetyDepartments'];

        for (const attr in e.data) {
            if (e.data[attr] && fieldUser.indexOf(attr) === -1) {
                let selectAttr = -1;

                if (e.key.attributes) {
                    selectAttr = e.key.attributes.findIndex(item => {
                        return item.attributeName === attr;
                    });
                } else {
                    e.key.attributes = [];
                }

                if (selectAttr > -1) {
                    e.key.attributes[selectAttr].attributeValue = e.data[attr];
                } else {
                    e.key.attributes.push({
                        attributeName: attr.toSnakeCase(),
                        attributeValue: e.data[attr],
                        idWebuser: e.key.id,
                    });
                }
            }
        }

        return e.key.attributes;
    }*/

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

    private loadDepartments() {
     this.departmentService.allLocalized().subscribe(fireSafetyDepartments => {
        this.allFireSafetyDepartments = fireSafetyDepartments;
        this.addAllFireSafetyDepartments();
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
        console.log(this.fireSafetyDepartments);
      });
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
    this.departmentService.getAll().subscribe(fireSafetyDepartments => {
      this.allFireSafetyDepartments = fireSafetyDepartments;
      this.addAllFireSafetyDepartments();
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
      console.log(fireSafetyDepartments);
    });
  }

  private addAllFireSafetyDepartments() {
    const all = new FireSafetyDepartment();
    all.id = 'ALL';
    all.name = this.labels['all'];
    this.allFireSafetyDepartments.unshift(all);
  }

  calculateFireSafetyDepartmentsDisplayValue = (e) => {
    const userFireSafetyDepartments = (e.userFireSafetyDepartments ? e.userFireSafetyDepartments as UserFireSafetyDepartmentModel[] : []);
    let fireSafetyDepartmentsName: any[] = [];
    userFireSafetyDepartments.forEach(userFireSafetyDepartment => {
      const fireSafetyDepartment = this.allFireSafetyDepartments.filter(f => f.id === userFireSafetyDepartment.fireSafetyDepartmentId);
      if (fireSafetyDepartment && fireSafetyDepartment[0]) {
        if (e.id === 'ALL') {
          fireSafetyDepartmentsName.push(e.name);
        } else {
          fireSafetyDepartmentsName.push(this.getLocalizedFireSafetyDepartmentName(fireSafetyDepartment[0]));
        }
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

  private getLocalizedFireSafetyDepartmentName(fireSafetyDepartment: FireSafetyDepartment) {
    const langage = localStorage.getItem('locale');
    return fireSafetyDepartment.localizations.filter(c => c.languageCode === langage)[0].name;
  }

  fireSafetyDepartmentDisplayExpr(e) {
    const langage = localStorage.getItem('locale');
    if (e.id === 'ALL') {
      return e.name;
    } else if (e.localizations) {
      const department = e.localizations.find(c => c.languageCode.toLowerCase() === langage);
      if (department) {
        return department.name;
      }
    }
    return '';
  }
}
