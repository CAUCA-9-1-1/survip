import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DxButtonComponent } from 'devextreme-angular';
import { EnumModel } from '../../management-type-system/shared/models/enum.model';
import { ObjectivesService } from '../shared/services/objectives.service';
import { checkNoChangesNode } from '@angular/core/src/view/view';

@Component({
  selector: 'app-objective-configuration',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  providers: [ObjectivesService]
})
export class ObjectiveComponent implements OnInit {
  isLoading = false;

  @Input() idFireSafetyDepartment = null;

  lowRisk = null;
  highRisk = [{ year: 2016, objective: 10 }, { year: 2017, objective: 10 }, { year: 2018, objective: 5 }, { year: 2019, objective: 7 }]

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private objectiveService: ObjectivesService,
  ) {
  }

  public ngOnInit() {
    this.loadObjectives();
  }

  onInitNewRow(e) {
    e.data.isActive = true;
    e.data.idFireSafetyDepartment = this.idFireSafetyDepartment.id;
  }

  public onRowInserted(e) {
    this.objectiveService.save(e.data);
  }

  public onRowUpdated(e) {
    this.objectiveService.save(e.data);
  }

  public onRowRemoved(e) {
    this.objectiveService.remove(e.data.id);
  }

  private loadObjectives() {
    this.objectiveService.getLocalized(this.idFireSafetyDepartment.id).subscribe(result => {
      this.lowRisk = result;
    });
  }
}
