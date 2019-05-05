import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ObjectivesService } from '../shared/services/objectives.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Objective } from '../../statistics/shared/models/objective.model';
import { FireSafetyDepartmentService } from '../../management-system/shared/services/firesafetydepartment.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  providers: [ObjectivesService, FireSafetyDepartmentService]
})
export class ObjectiveComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @Input() isHighRisk: boolean;

  public isReady = false;
  public dataSource: Objective[] = [];
  public IdSelectedFireSafetyDepartment: string = null;

  private formFieldFireSafetyDepartment: any = null;
  private labels: any = {};

  constructor(
    public translateService: TranslateService,
    private objectiveService: ObjectivesService,
    private fireSafetyDepartmentService: FireSafetyDepartmentService,
  ) {
    this.translateService.get([
      'selectFireSafetyDepartment', 'add'
    ]).subscribe(labels => {
      this.labels = labels;
    });
  }

  public ngOnInit() {
    this.loadFireSafetyDepartment();
    this.loadObjectives();
  }

  public onToolbarPreparing(e) {
    const toolbarItems = e.toolbarOptions.items;

    toolbarItems.unshift({
      widget: 'dxLookup',
      options: {
        displayExpr: 'name',
        valueExpr: 'id',
        width: 300,
        placeholder: this.labels['selectFireSafetyDepartment'],
        title: this.labels['selectFireSafetyDepartmloadent'],
        closeOnOutsideClick: true,
        onInitialized: (ev) => {
          this.formFieldFireSafetyDepartment = ev.component;
        },
        onValueChanged: (ev) => {
          this.IdSelectedFireSafetyDepartment = ev.value;
        }
      }
    });
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
    e.data.isHighRisk = this.isHighRisk;
    e.data.idFireSafetyDepartment = this.IdSelectedFireSafetyDepartment;
  }

  public onRowInserted(e) {
    this.objectiveService.save(e.data).subscribe(idObjective => {
      e.data.id = idObjective;
    });
  }

  public onRowUpdated(e) {
    this.objectiveService.save(e.key);
  }

  public onRowRemoved(e) {
    this.objectiveService.remove(e.data.id);
  }

  private loadObjectives() {
    this.objectiveService.getAll(this.isHighRisk).subscribe(objectives => {
      this.dataSource = objectives;
      this.isReady = true;
    });
  }

  private loadFireSafetyDepartment() {
    this.fireSafetyDepartmentService.localized().subscribe(data => {
      this.IdSelectedFireSafetyDepartment = (data[0] ? data[0].id : '');
      this.formFieldFireSafetyDepartment.option('value', (data[0] ? data[0].id : ''));
      this.formFieldFireSafetyDepartment.option('dataSource', {
        store: data,
        select: ['id', 'name'],
        sort: ['name'],
      });
    });
  }
}
