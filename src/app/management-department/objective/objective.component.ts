import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ObjectivesService } from '../shared/services/objectives.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Objective } from '../../statistics/shared/models/objective.model';
import { FireSafetyDepartmentService } from '../../management-system/shared/services/firesafetydepartment.service';

@Component({
  selector: 'app-manage-objectives',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  providers: [ObjectivesService, FireSafetyDepartmentService]
})
export class ObjectiveComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  public isLoading = false;
  public lowRisk: Objective[] = [];

  private dataSource: Objective[] = [];
  private formFieldFireSafetyDepartment: any = null;
  private labels: any = {};
  private selectedFireSafetyDepartment: string = null;

  constructor(
    private dialog: MatDialog,
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

  setModel(data: any) {
    return Objective.fromJSON(data);
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
          this.selectedFireSafetyDepartment = ev.value;
          this.lowRisk = this.dataSource.filter((el) => {
            return (el.idFireSafetyDepartment === ev.value);
          });
        }
      }
    });
  }

  onInitNewRow(e) {
    e.data.isActive = true;
    e.data.idFireSafetyDepartment = this.selectedFireSafetyDepartment;
  }

  public onRowInserted(e) {
    this.objectiveService.save(e.data);
  }

  public onRowUpdated(e) {
    this.objectiveService.save(e.key);
  }

  public onRowRemoved(e) {
    this.objectiveService.remove(e.data.id);
  }

  private loadObjectives() {
    this.objectiveService.getAll();
  }

  private loadFireSafetyDepartment() {
    this.fireSafetyDepartmentService.localized().subscribe(data => {
      this.formFieldFireSafetyDepartment.option('value', (data[0] ? data[0].id : ''));
      this.formFieldFireSafetyDepartment.option('dataSource', {
        store: data,
        select: ['id', 'name'],
        sort: ['name'],
      });
    });
  }
}
