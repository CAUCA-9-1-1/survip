import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';

@Component({
  selector: 'app-managementbuilding-utilisationcode',
  templateUrl: './utilisation-code.component.html',
  styleUrls: ['./utilisation-code.component.styl'],
  providers: [
    UtilisationCodeService,
  ]
})
export class UtilisationCodeComponent extends DevextremeDatagrid implements OnInit {
  utilisationCodes: UtilisationCode[] = [];

  constructor(
    private utilisationCodeService: UtilisationCodeService
  ) {
    super();
  }

  ngOnInit() {
    this.loadUtilisationCode();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.utilisationCodeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadUtilisationCode();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idUtilisationCode = e.key.idUtilisationCode;

    this.utilisationCodeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.utilisationCodeService.remove(e.key.idUtilisationCode).subscribe();
  }

  private loadUtilisationCode() {
    this.utilisationCodeService.getAll().subscribe(data => this.utilisationCodes = data);
  }
}
