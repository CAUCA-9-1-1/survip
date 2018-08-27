import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {PermissionSystemFeature} from '../shared/models/permissionsystemfeature.model';
import {PermissionObjectService} from '../shared/services/permissionobject.service';
import {PermissionObject} from '../shared/models/permissionobject.model';
import {PermissionService} from '../shared/services/permission.service';

@Component({
    selector: 'app-management-access-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
    providers: [
        PermissionService,
        PermissionObjectService,
    ]
})
export class PermissionComponent implements OnInit {
    features: PermissionSystemFeature[] = [];
    permissionObjects: PermissionObject[] = [];
    editing: object = {};
    filter: object = {};
    labels: object = {};
    defaultLookup: object = {};
    accessLookup: object = {};
    lastPermissionObject: any = {};

    constructor(
        private permissionService: PermissionService,
        private permissionObjectService: PermissionObjectService,
        private translate: TranslateService
    ) {
        this.editing = {
            mode: 'cell',
            allowUpdating: true,
            // allowAdding: true,
            // allowDeleting: true,
        };
        this.filter = {
            visible: true
        };

        this.translate.get([
            'yes', 'no', 'seeParent', 'description', 'defaultValue', 'accessValue'
        ]).subscribe((result: object) => {
            this.labels = result;
            this.defaultLookup = {
                dataSource: [
                    {'value': true, 'text': result['yes']},
                    {'value': false, 'text': result['no']}
                ],
                displayExpr: 'text',
                valueExpr: 'value'
            };

            this.accessLookup = {
                dataSource: [
                    {'value': null, 'text': result['seeParent']},
                    {'value': true, 'text': result['yes']},
                    {'value': false, 'text': result['no']}
                ],
                displayExpr: 'text',
                valueExpr: 'value'
            };
        });
    }

    public ngOnInit() {
        this.loadPermissionObject();
    }

    public onRowSelected(e) {
        this.lastPermissionObject = e.itemData;
        this.loadSystemFeature();
    }

    public onRowUpdated(e) {
        e.key.feature = null;

        this.permissionService.save(e.key).subscribe(result => {
            this.loadSystemFeature();
        });
    }

    private loadSystemFeature() {
        this.permissionService.getOne(this.lastPermissionObject.id).subscribe(data => this.features = data);
    }

    private loadPermissionObject() {
        this.permissionObjectService.getAll().subscribe(data => this.permissionObjects = data);
    }

    private onCalculateDisplayValue(column, data) {
        return (data[column] === true ? this.labels['yes'] : (data[column] === false ? this.labels['no'] : this.labels['seeParent']));
    }
}
