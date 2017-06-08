import {Component, OnInit} from '@angular/core';
import {ApisAction} from '../shared/models/apisaction.model';
import {ApisActionService} from '../shared/services/apisaction.service';
import {Webuser} from '../shared/models/webuser.model';
import {WebuserService} from '../shared/services/webuser.service';

@Component({
  selector: 'app-management-access-apisaction',
  templateUrl: './apisaction.component.html',
  styleUrls: ['./apisaction.component.styl'],
  providers: [
    ApisActionService,
    WebuserService,
  ]
})
export class ApisactionComponent implements OnInit {
  actions: ApisAction[] = [];
  users: Webuser[] = [];

  constructor(
    private actionService: ApisActionService,
    private webuserService: WebuserService
  ) { }

  ngOnInit() {
    this.loadAction();
    this.loadWebuser();
  }

  private loadAction() {
    this.actionService.getAll().subscribe(infoAction => {
      this.actions = infoAction.data;
    });
  }

  private loadWebuser() {
    this.webuserService.getAll().subscribe(infoUser => {
      this.users = infoUser.data;
    });
  }
}
