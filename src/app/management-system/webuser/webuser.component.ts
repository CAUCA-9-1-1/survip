import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {Password} from '../../shared/classes/password';
import {Color} from '../../shared/classes/color';

@Component({
    selector: 'app-management-system-webuser',
    templateUrl: './webuser.component.html',
    styleUrls: ['./webuser.component.scss'],
    providers: [
        FireSafetyDepartmentService,
        WebuserService,
    ]
})
export class WebuserComponent extends GridWithCrudService implements OnInit {
    private selectedPassword: string;
    private selectedIdWebuser: string;

    labels = {};
    departments: any = {store: []};
    departmentField: any;
    webuserFireSafetyDepartments = [];
    passwordOptions = {
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
        webuserService: WebuserService,
        protected translateService: TranslateService,
        private departmentService: FireSafetyDepartmentService,
    ) {
        super(translateService, webuserService);

        translateService.get([
            'passwordError',
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return Webuser.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadDepartments();
    }

    getFirstname = (e) => {
        return this.getWebuserAttribute('first_name', e);
    }

    getLastname = (e) => {
        return this.getWebuserAttribute('last_name', e);
    }

    getEmail = (e) => {
        return this.getWebuserAttribute('email', e);
    }

    getTelephone = (e) => {
        return this.getWebuserAttribute('telephone', e);
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

    onEditorPreparing(e) {
        if (e.dataField === 'username') {
            e.editorOptions.onFocusIn = ((ev) => {
                console.log('onInitialized username', ev);
                if (ev.component.option('value') === ' ') {
                    (ev.component.element().querySelector('input')  as HTMLInputElement).select();
                }
            });
        }
        if (e.row && e.row.data) {
            if (e.row.data.idExtern) {
                e.editorOptions.readOnly = true;
                this.readOnly = e.editorOptions.readOnly;
            } else {
                this.readOnly = false;
            }
        }
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
        e.data.password = '';
        e.data.resetPassword = this.getWebuserAttribute('reset_password', e.data);
        this.webuserFireSafetyDepartments = e.data.fireSafetyDepartments;
        this.selectedIdWebuser = e.data.id;
        this.selectedPassword = '';
    }

    onRowInserted(e) {

        e.data.attributes = this.setWebuserAttributes(e);

        super.onRowInserted(e);
    }

    onRowUpdated(e) {
        e.key.attributes = this.setWebuserAttributes(e);

        super.onRowUpdated(e);
    }

    ondRowValidating(e) {
        if (!e.isValid && e.brokenRules[0].type === 'compare' && !e.newData.password) {
            e.isValid = true;
        }
    }

    setDepartmentField(field) {
        this.departmentField = field;

        if (!this.departmentField.value) {
            this.departmentField.value = [];
        }
    }

    onNewUserDepartment(e) {
        e.data.idWebuser = this.selectedIdWebuser;
        e.data.isActive = true;
    }

    onUserDepartmentInserted(e) {
        if (!this.selectedIdWebuser) {
            this.departmentField.data.fireSafetyDepartments.push(e.data);
        }

        this.departmentField.setValue(this.departmentField.data.fireSafetyDepartments);
    }

    onUserDepartmentUpdated(e) {
        if (!this.selectedIdWebuser) {
            const department = this.departmentField.data.fireSafetyDepartments.findIndex(item => {
                return item.idFireSafetyDepartment === e.key.idFireSafetyDepartment;
            });

            if (department > -1) {
                this.departmentField.data.fireSafetyDepartments[department] = e.key;
            }
        }

        this.departmentField.setValue(this.departmentField.data.fireSafetyDepartments);
    }

    onUserDepartmentRemoved(e) {
        if (!this.selectedIdWebuser) {
            const department = this.departmentField.data.fireSafetyDepartments.findIndex(item => {
                return item.idFireSafetyDepartment === e.key.idFireSafetyDepartment;
            });

            if (department > -1) {
                this.departmentField.data.fireSafetyDepartments.splice(department, 1);
            }
        }

        this.departmentField.setValue(this.departmentField.data.fireSafetyDepartments);
    }

    public departmentEditorPreparing(e) {
        if (e.dataField === 'idFireSafetyDepartment') {
            e.editorOptions.onOpened = (ev) => {
                const ids = this.webuserFireSafetyDepartments.map(({idFireSafetyDepartment}) => idFireSafetyDepartment);
                const dataSource = Object.create(this.departments);
                dataSource.store = [];
                this.departments.store.forEach(c => {
                    const index = ids.indexOf(c.id);
                    const selectedItemId = e.component.option('selectedItem');
                    if (index && index === -1 || (selectedItemId && selectedItemId.id === c.id)) {
                        dataSource.store.push({id: c.id, name: c.name});
                    }
                });
                ev.component.option('dataSource', dataSource);
            };
        }
    }

    private setWebuserAttributes(e) {
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

    private loadDepartments() {
        this.departmentService.allLocalized().subscribe(data => this.departments = {
            store: data,
            select: ['id', 'name'],
            sort: ['name'],
        });
    }
}
