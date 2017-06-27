import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {PersonRequiringAssistanceType} from '../shared/models/person-requiring-assistance-type.model';
import {PersonRequiringAssistanceTypeService} from '../shared/services/person-requiring-assistance-type.service';

@Component({
  selector: 'app-managementbuilding-personrequiringassistancetype',
  templateUrl: './person-requiring-assistance-type.component.html',
  styleUrls: ['./person-requiring-assistance-type.component.styl'],
  providers: [
    PersonRequiringAssistanceTypeService,
  ]
})
export class PersonRequiringAssistanceTypeComponent extends DevextremeDatagrid implements OnInit {
  personRequiringAssistanceTypes: PersonRequiringAssistanceType[] = [];

  constructor(
    private personRequiringAssistanceTypeService: PersonRequiringAssistanceTypeService
  ) {
    super();
  }

  ngOnInit() {
    this.loadConstructionType();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.personRequiringAssistanceTypeService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadConstructionType();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idPersonRequiringAssistanceType = e.key.idPersonRequiringAssistanceType;

    this.personRequiringAssistanceTypeService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.personRequiringAssistanceTypeService.remove(e.key.idPersonRequiringAssistanceType).subscribe();
  }

  private loadConstructionType() {
    this.personRequiringAssistanceTypeService.getAll().subscribe(data => this.personRequiringAssistanceTypes = data);
  }
}
