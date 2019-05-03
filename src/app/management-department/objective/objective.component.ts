import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
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

  public isLoading = false;
  public filteredObjectives: Objective[] = [];

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
          this.filterList(this.selectedFireSafetyDepartment);
        },
        onValueChanged: (ev) => {
          this.selectedFireSafetyDepartment = ev.value;
          this.filterList(ev.value);
        }
      }
    });
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
    e.data.isHighRisk = this.isHighRisk;
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
    this.objectiveService.getAll(this.isHighRisk).subscribe(objectives => {
      this.dataSource = objectives;
    });
  }

  private loadFireSafetyDepartment() {
    this.fireSafetyDepartmentService.localized().subscribe(data => {
      this.selectedFireSafetyDepartment = (data[0] ? data[0].id : '');
      this.formFieldFireSafetyDepartment.option('value', (data[0] ? data[0].id : ''));
      this.formFieldFireSafetyDepartment.option('dataSource', {
        store: data,
        select: ['id', 'name'],
        sort: ['name'],
      });
    });
  }

  private filterList(value: string) {
    this.filteredObjectives = this.dataSource.filter((el) => {
      return (el.idFireSafetyDepartment === value);
    });
  }
}
