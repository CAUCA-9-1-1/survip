import {Component, OnInit} from '@angular/core';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';

@Component({
  selector: 'app-management-access-webuser',
  templateUrl: './webuser.component.html',
  styleUrls: ['./webuser.component.styl'],
  providers: [WebuserService]
})
export class WebuserComponent implements OnInit {
  users: Webuser[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private webuserService: WebuserService) {
    this.columns = [{
      dataField: 'attributes.firstName',
      caption: 'firstname'
    }, {
      dataField: 'attributes.lastName',
      caption: 'lastname'
    }, {
      dataField: 'isActive',
      dataType: 'boolean',
      caption: 'isActive',
      width: '10%'
    }];

    this.editing = {
      mode: 'form',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
      form: {
        colCount: 1,
        items: [{
          dataField: 'attributes.firstName',
          isRequired: true
        }, {
          dataField: 'attributes.lastName',
          isRequired: true
        }, {
          dataField: 'isActive',
          editorType: 'dxCheckBox'
        }]
      }
    };
    this.filter = {
      visible: true
    };
  }

  public ngOnInit() {
    this.loadAll();
  }

  /* ngOnChanges() {
    console.log('change');
  }*/

  public onRowUpdated(e) {
    for (const i in e.data) {
      if (e.data[i]) {
        e.key[i] = e.data[i];
      }
    }

    this.webuserService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.webuserService.getAll().subscribe(infoWebuser => {
      if (!infoWebuser.success) {
        console.error(infoWebuser.error);
      }

      this.users = infoWebuser.data;
    });
  }
}
