import {Component, OnInit} from '@angular/core';
import {ApisAction} from '../shared/models/apisaction.model';
import {ApisActionService} from '../shared/services/apisaction.service';

@Component({
  selector: 'app-management-access-apisaction',
  templateUrl: './apisaction.component.html',
  styleUrls: ['./apisaction.component.styl'],
  providers: [ApisActionService]
})
export class ApisactionComponent implements OnInit {
  actions: ApisAction[] = [];
  columns: object[] = [];
  filter: object = {};

  constructor(private actionService: ApisActionService) {
    this.columns = [{
      dataField: 'idWebuser',
      caption: 'webuser'
    }, {
      dataField: 'actionTime',
      caption: 'time'
    }, {
      dataField: 'actionObject',
      caption: 'object'
    }];
    this.filter = {
      visible: true
    };
  }

  ngOnInit() {
    this.loadAll();
  }

  private loadAll() {
    this.actionService.getAll().subscribe(infoAction => {
      if (!infoAction.success) {
        console.error(infoAction.error);
      }

      this.actions = infoAction.data;
    });
  }
}