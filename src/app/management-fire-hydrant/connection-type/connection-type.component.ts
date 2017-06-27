import { Component, OnInit } from '@angular/core';
import {
  DevextremeDatagrid
} from 'cause-lib';

import {ConnectionType} from '../shared/models/connection-type.model';
import {ConnectionTypeService} from '../shared/services/connection-type.service';

@Component({
  selector: 'app-managementfirehydrant-connectiontype',
  templateUrl: './connection-type.component.html',
  styleUrls: ['./connection-type.component.styl'],
  providers: [ConnectionTypeService]
})
export class ConnectionTypeComponent extends DevextremeDatagrid implements OnInit {
  connectionTypes: ConnectionType[] = [];

  constructor(private connectionTypeService: ConnectionTypeService) {
    super();
  }

  ngOnInit() {
    this.loadConnectionType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.connectionTypeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadConnectionType();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idConnectionType = e.key.idConnectionType;

    this.connectionTypeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.connectionTypeService.remove(e.key.idConnectionType).subscribe();
  }

  private loadConnectionType() {
    this.connectionTypeService.getAll().subscribe(data => this.connectionTypes = data);
  }
}
