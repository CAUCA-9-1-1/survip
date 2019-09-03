import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {DxButtonComponent, DxDataGridComponent} from 'devextreme-angular';
import {PermissionObjectService} from '../shared/services/permission-object.service';
import {PermissionObject} from '../shared/models/permissionobject.model';
import {PermissionService} from '../../user-access/shared/services/permission.service';
import {AddUserInGroupComponent} from '../add-user-in-group/add-user-in-group.component';
import {WebuserService} from '../shared/services/webuser.service';
import {AddGroupComponent} from '../add-group/add-group.component';
import {AskRemoveItemComponent} from '../ask-remove-item/ask-remove-item.component';
import {Permission} from '../../user-access/shared/models/permission.model';
import {PermissionSystemFeatureService} from '../shared/services/permission-system-feature.service';


@Component({
    selector: 'app-management-system-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
    providers: [
        WebuserService,
        PermissionService,
        PermissionObjectService,
    ]
})
export class PermissionComponent implements OnInit {
    @ViewChild('removeItem', {static: false}) removeItem: DxButtonComponent;
    @ViewChild('addUser', {static: false}) addUser: DxButtonComponent;

    features: Permission[] = [];
    permissionObjects: PermissionObject[] = [];
    editing: object = {};
    filter: object = {};
    labels: object = {};
    defaultLookup: object = {};
    accessLookup: object = {};
    users: any = [];
    selectedPermissionObject: any = {};
    isLoading = false;

    constructor(
        private webuserService: WebuserService,
        private permissionService: PermissionService,
        private permissionFeatureService: PermissionSystemFeatureService,
        private permissionObjectService: PermissionObjectService,
        private dialog: MatDialog,
        private translate: TranslateService
    ) {
        this.editing = {
            mode: 'cell',
            allowUpdating: true
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
        this.isLoading = true;
        this.selectedPermissionObject = e.itemData;
        this.loadSystemFeature();

        this.addUser.instance.option('disabled', false);
        this.removeItem.instance.option('disabled', false);
    }

    public onRowUpdated(e) {
        if (e.data.feature) {
            this.permissionFeatureService.save(e.key.feature).subscribe(result => {
                this.loadSystemFeature();
            });
        } else {
            e.key.feature = null;

            this.permissionService.save(e.key).subscribe(result => {
                this.loadSystemFeature();
            });
        }
    }

    public onRemoveItem() {
        const dialogRef = this.dialog.open(AskRemoveItemComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.permissionObjectService.remove(this.selectedPermissionObject.id).subscribe(data => {
                this.loadPermissionObject();
                });
            }
        });
    }

    public onAddGroup() {
        const dialogRef = this.dialog.open(AddGroupComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.description) {
                const objectPermission = new PermissionObject();
                objectPermission.objectTable = 'group';
                objectPermission.groupName = result.description;
                objectPermission.isGroup = true;
                objectPermission.idPermissionSystem = (
                    this.selectedPermissionObject.idPermissionSystem || this.permissionObjects[0].idPermissionSystem
                );

                this.permissionObjectService.save(objectPermission).subscribe(data => {
                    this.loadPermissionObject();
                });
            }
        });
    }

    public onAddUser() {
        const dialogRef = this.dialog.open(AddUserInGroupComponent, {
            width: '400px',
            data: {
                users: this.users,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.selectedUser) {
                const objectPermission = new PermissionObject();
                objectPermission.genericId = result.selectedUser;
                objectPermission.objectTable = 'webuser';
                objectPermission.idPermissionObjectParent = (
                    this.selectedPermissionObject.isGroup ?
                        this.selectedPermissionObject.id :
                        this.selectedPermissionObject.idPermissionObjectParent
                );
                objectPermission.idPermissionSystem = this.selectedPermissionObject.idPermissionSystem;

                this.permissionObjectService.save(objectPermission).subscribe(data => {
                    this.loadPermissionObject();
                });
            }
        });
    }

    private loadUsers() {
        this.webuserService.getActiveForPermissions().subscribe(data => {
            this.users = data.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
            this.showUsersThatAreNotInAGroup();
        });
    }

    private showUsersThatAreNotInAGroup() {
      for (let index = (this.users.length - 1) ; index >= 0 ; index--) {
        const find = this.permissionObjects.filter(obj => obj.genericId === this.users[index].id);
        if (find.length > 0) {
          this.users.splice(index, 1);
        }
      }
    }

    private loadSystemFeature() {
        this.permissionService.getObjectPermission(this.selectedPermissionObject.id).subscribe(data => {
            this.features = data;
            this.isLoading = false;
        });
    }

    private loadPermissionObject() {
        this.permissionObjectService.getAll().subscribe(data => {
            this.permissionObjects = data;

            this.loadUsers();
        });
    }
}
