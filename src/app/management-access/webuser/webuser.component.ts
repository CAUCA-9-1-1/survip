import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {Password} from '../../shared/classes/password';
import {Color} from '../../shared/classes/color';


@Component({
    selector: 'app-management-access-webuser',
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
    departments: FireSafetyDepartment[] = [];
    departmentField: any;
    webuserFireSafetyDepartments = [];
    passwordOptions = {
        mode: 'password',
        onKeyUp: (ev) => {
            const password = new Password();
            const color = new Color();
            const input = ev.component.element().querySelector('input');
            const hue = password.quality(input.value) * 1.2 / 360;
            const rgb = color.hslToRgb(hue, 1, 0.5);

            if (input.value) {
                input.style.backgroundColor = ['rgb(', rgb[0], ',', rgb[1], ',', rgb[2], ')'].join('');
            }
        }
    };

    constructor(
        webuserService: WebuserService,
        translateService: TranslateService,
        private departmentService: FireSafetyDepartmentService,
    ) {
        super(webuserService);

        translateService.get([
            'passwordError'
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

    getFirstname(e) {
        let name = '';

        if (e.attributes) {
            e.attributes.forEach(attribute => {
                if (attribute.attributeName === 'first_name') {
                    name = attribute.attributeValue;
                }
            });
        }

        return name;
    }

    getLastname(e) {
        let name = '';

        if (e.attributes) {
            e.attributes.forEach(attribute => {
                if (attribute.attributeName === 'last_name') {
                    name = attribute.attributeValue;
                }
            });
        }

        return name;
    }

    getAttribute(field, e) {
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

    getDepartmentName(data) {
        const departments = FireSafetyDepartment.fromJSON(data);

        return departments.getLocalization(environment.locale.use);
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
        if (e.dataField === 'password') {
            e.editorOptions.mode = 'password';
        }
    }

    onInitNewRow(e) {
        e.data.isActive = true;
        e.data.resetPassword = true;
    }

    onEditingStart(e) {
        e.data.password = '';
        e.data.resetPassword = this.getAttribute('resetPassword', e.data);

        this.webuserFireSafetyDepartments = e.data.fireSafetyDepartments;
        this.selectedIdWebuser = e.data.id;
        this.selectedPassword = '';
    }

    onRowUpdated(e) {
        const fieldUser = ['id', 'createOn', 'isActive', 'password', 'username', 'fireSafetyDepartments'];

        for (const attr in e.data) {
            if (e.data[attr] && fieldUser.indexOf(attr) === -1) {
                const selectAttr = e.key.attributes.filter(item => {
                    if (item.attribute_name === attr) {
                        return item;
                    }
                });

                if (selectAttr.length) {
                    console.log(selectAttr);
                } else {
                    e.key.attributes.push({
                        attributeName: attr,
                        attributeValue: e.data[attr],
                        idWebuser: e.key.id,
                    });
                }
            }
        }
console.log(e.key);
        super.onRowUpdated(e);
    }

    setDepartmentField(field) {
        this.departmentField = field;

        if (!this.departmentField.value) {
            this.departmentField.value = {};
        }
    }

    onNewUserDepartment(e) {
        e.data.idWebuser = this.selectedIdWebuser;
        e.data.isActive = true;
    }

    onUserDepartmentChanged(e) {
        this.departmentField.setValue(this.departmentField.data.fireSafetyDepartments);
    }

    private loadDepartments() {
        this.departmentService.getAll().subscribe(data => this.departments = data);
    }
}
