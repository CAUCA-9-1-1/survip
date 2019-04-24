import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DxButtonComponent } from 'devextreme-angular';
import { PermissionService } from '../../user-access/shared/services/permission.service';
import { Permission } from '../../user-access/shared/models/permission.model';
import { EnumModel } from '../../management-type-system/shared/models/enum.model';
import { CityService } from '../../management-address/shared/services/city.service';

@Component({
  selector: 'app-management-department-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  providers: [
    PermissionService,
  ]
})
export class ObjectiveComponent implements OnInit {
  @ViewChild('removeItem') removeItem: DxButtonComponent;
  @ViewChild('addUser') addUser: DxButtonComponent;

  features: Permission[] = [];
  editing: object = {};
  filter: object = {};
  labels: object = {};
  defaultLookup: object = {};
  accessLookup: object = {};
  users: any = [];
  selectedPermissionObject: any = {};
  isLoading = false;

  public selectedLocationType: string;
  public locationTypes: EnumModel[] = [];
  public addressLocationTypes: EnumModel[] = [];
  public addingButton: any;
  public selectedCity = '';
  public selectedCityGeometry: any = {};
  public fireHydrantTypes: any = { store: [] };
  public lanes: any = {};
  public lanesOfCity: any = {};
  public operatorTypes: EnumModel[] = [];
  public rateUnits: any = { store: [] };
  public pressureUnits: any = { store: [] };
  public formFields = {
    idLane: null,
    idCity: null,
    idLaneTransversal: null,
  };

  constructor(
    private permissionService: PermissionService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private cityService: CityService,

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
          { 'value': true, 'text': result['yes'] },
          { 'value': false, 'text': result['no'] }
        ],
        displayExpr: 'text',
        valueExpr: 'value'
      };

      this.accessLookup = {
        dataSource: [
          { 'value': null, 'text': result['seeParent'] },
          { 'value': true, 'text': result['yes'] },
          { 'value': false, 'text': result['no'] }
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
      /* this.permissionFeatureService.save(e.key.feature).subscribe(result => {
        this.loadSystemFeature();
      }); */
    } else {
      e.key.feature = null;

      this.permissionService.save(e.key).subscribe(result => {
        this.loadSystemFeature();
      });
    }
  }

  public onRemoveItem() {
    /*  const dialogRef = this.dialog.open(AskRemoveItemComponent, {
       width: '400px',
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         this.permissionObjectService.remove(this.selectedPermissionObject.id).subscribe(data => {
           this.loadPermissionObject();
         });
       }
     }); */
  }

  public onAddUser() {
    /*     const dialogRef = this.dialog.open(AddUserInGroupComponent, {
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
        }); */
  }

  private loadUsers() {
    /*     this.webuserService.getActiveForPermissions().subscribe(data => {
          this.users = data.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.showUsersThatAreNotInAGroup();
        });
      }
    
      private showUsersThatAreNotInAGroup() {
        for (let index = (this.users.length - 1); index >= 0; index--) {
          const find = this.permissionObjects.filter(obj => obj.genericId === this.users[index].id);
          if (find.length > 0) {
            this.users.splice(index, 1);
          }
        } */
  }

  private loadSystemFeature() {
    this.permissionService.getObjectPermission(this.selectedPermissionObject.id).subscribe(data => {
      this.features = data;
      this.isLoading = false;
    });
  }

  private loadPermissionObject() {
    /*     this.permissionObjectService.getAll().subscribe(data => {
          this.permissionObjects = data;
    
          this.loadUsers();
        }); */
  }

  public onToolbarPreparing(e) {
    const toolbarItems = e.toolbarOptions.items;

    if (!this.cityService.readOnlyImported) {
      toolbarItems.unshift({
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'plus',
          width: 36,
          disabled: false,
          hint: this.labels['add'],
          onInitialized: (ev) => {
            this.addingButton = ev.component;
          },
          onClick: (ev) => {
            e.component.addRow();
          },
        }
      });
    }

    toolbarItems.unshift({
      widget: 'dxLookup',
      options: {
        displayExpr: 'name',
        valueExpr: 'id',
        width: 300,
        placeholder: this.labels['selectCity'],
        title: this.labels['selectCity'],
        closeOnOutsideClick: true,
        onInitialized: (ev) => {
          this.formFields.idCity = ev.component;
          // this.loadCity();
        },
        onValueChanged: (ev) => {
          this.cityService.geolocation(ev.value).subscribe(data => {
            this.selectedCityGeometry = data['features'][0];
          });

          // this.cityId = this.selectedCity;
          this.selectedCity = ev.value;
          // this.dataSource.filter(['idCity', '=', new Guid(ev.value)]);
          // this.dataSource.load();
          // this.loadLaneByCity(ev.value);
        }
      }
    });
  }
}
