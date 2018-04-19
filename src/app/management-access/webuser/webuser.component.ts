import {Component, OnInit} from '@angular/core';

import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {WebuserFireSafetyDepartment} from '../shared/models/webuserfiresafetydepartment.model';
import {WebuserFireSafetyDepartmentService} from '../shared/services/webuserfiresafetydepartment.service';


@Component({
    selector: 'app-management-access-webuser',
    templateUrl: './webuser.component.html',
    styleUrls: ['./webuser.component.scss'],
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

    ngOnInit() {
        this.loadUsers();
        this.loadDepartments();
    }

    getFirstname(e) {
        let name = '';

        e.attributes.forEach(attribute => {
            if (attribute.attributeName === 'firstname') {
                name = attribute.attributeValue;
            }
        });

        return name;
    }

    getLastname(e) {
        let name = '';
        e.attributes.forEach(attribute => {
            if (attribute.attributeName === 'lastname') {
                name = attribute.attributeValue;
            }
        });

        return name;
    }

    getAttribute(field, e) {
        let name = '';

        e.attributes.forEach(attribute => {
            if (attribute.attributeName === field) {
                name = attribute.attributeValue;
            }
        });

        return name;
    }

    onPasswordChanged = (e) => {
        if (e.value && e.value.length < 8) {
          return false;
        }

        this.selectedPassword = e.value;
        return true;
    }

    onPasswordCompare = () => {
        return (this.selectedPassword ? this.selectedPassword : null);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
        e.data.attributes = {
            resetPassword: true
        };
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

    onEditingStart(e) {
        e.data.password = '';
        e.data.resetPassword = false;

        this.loadUserDepartment(e.data.id);

        this.selectedIdWebuser = e.data.id;
        this.selectedPassword = '';
    }

    onRowInserted(e) {
        this.webuserService.save(e.data).subscribe(info => {
            this.loadUsers();
        });
    }

    onRowUpdated(e) {
        this.webuserService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.webuserService.remove(e.key.id).subscribe();
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

        /*this.webuserDeptService.create(e.data).subscribe(info => {
          if (info.success) {
            this.loadUserDepartment(this.selectedIdWebuser);
          }
        });*/
    }

    public onUserDepartmentUpdated(e) {
        for (const i in e.data) {
          if (e.data[i]) {
            e.key[i] = e.data[i];
          }
        }

        // this.webuserDeptService.update(e.key).subscribe();
    }

    public onUserDepartmentRemoved(e) {
        // this.webuserDeptService.remove(e.key.selectedIdWebuser).subscribe();
    }

    private loadUsers() {
        this.webuserService.getAll().subscribe(data => this.users = data);
    }

    private loadDepartments() {
        this.departmentService.getAll().subscribe(data => this.departments = data);
    }

    private loadUserDepartment(idWebuser: string) {
        // this.webuserDeptService.getByUser(idWebuser).subscribe(data => this.userDepartments = data);
    }
}
