import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {Webuser} from '../shared/models/webuser.model';


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

    departments: FireSafetyDepartment[] = [];
    webuserFireSafetyDepartments = [];

    constructor(
        webuserService: WebuserService,
        private departmentService: FireSafetyDepartmentService,
    ) {
        super(webuserService);
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
                if (attribute.attributeName === 'firstname') {
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
                if (attribute.attributeName === 'lastname') {
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

    onPasswordChanged(e) {
        if (e.value && e.value.length < 8) {
          return false;
        }

        this.selectedPassword = e.value;
        return true;
    }

    onPasswordCompare() {
        return (this.selectedPassword ? this.selectedPassword : null);
    }

    onEditorPreparing(e) {
        if (e.dataField === 'password' || e.dataField === 'passwordConfirm') {
            e.editorOptions.mode = 'password';
            e.editorOptions.onKeyUp = (ev) => {
                /*const password = new Password();
                const color = new Color();
                const input = ev.component.element().find('input').get(0);
                const hue = password.quality(input.value) * 1.2 / 360;
                const rgb = color.hslToRgb(hue, 1, 0.5);

                if (input.value) {
                    ev.component.element().find('input').css({
                        'background-color': ['rgb(', rgb[0], ',', rgb[1], ',', rgb[2], ')'].join('')
                    });
                }*/
            };
        }
    }

    onInitNewRow(e) {
        e.data.isActive = true;
        e.data.resetPassword = true;
    }

    onEditingStart(e) {
        e.data.password = '';
        e.data.resetPassword = this.getAttribute('resetPassword', e.data);

        console.log('edit SSI', e);

        this.webuserFireSafetyDepartments = e.data.fireSafetyDepartments;
        this.selectedIdWebuser = e.data.id;
        this.selectedPassword = '';
    }

    onNewUserDepartment(e) {
        e.data.idWebuser = this.selectedIdWebuser;
        e.data.isActive = true;
    }

    onUserDepartmentInserted(e) {
        console.log('SSI insert', e);
    }

    onUserDepartmentUpdated(e) {
        for (const i in e.data) {
          if (e.data[i]) {
            e.key[i] = e.data[i];
          }
        }

    }

    onUserDepartmentRemoved(e) {
        // this.webuserDeptService.remove(e.key.selectedIdWebuser).subscribe();
    }

    private loadDepartments() {
        this.departmentService.getAll().subscribe(data => this.departments = data);
    }
}
