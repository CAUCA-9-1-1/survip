import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Objective } from '../../statistics/shared/models/objective.model';
import { ResultTableCell } from '../../statistics/shared/models/result-table-cell.model';
import { InspectionForStatistics } from '../../statistics/shared/models/inspection-for-statistics.model';


@Component({
  selector: 'app-objective-grid',
  templateUrl: './objective-grid.component.html',
  styleUrls: ['./objective-grid.component.scss']
})
export class ObjectiveGridComponent implements OnInit {
  @Input() isHighRisk: boolean;
  @Input() objectives: Objective[];
  @Input() inspectionStatistics: InspectionForStatistics[];

  public dataSource: ResultTableCell[] = [];

  public isLoading = false;
  public labels: string[];

  get title() {
    return (this.isHighRisk) ? this.labels['highRisk'] : this.labels['lowRisk'];
  }

  getValue(rowData): number {
    console.log(1);
    return 1;
  }

  constructor(
    public translateService: TranslateService,
  ) {
  }

  public ngOnInit() {
    this.translateService.get([
      'highRisk', 'lowRisk'
    ]).subscribe(labels => {
      this.labels = labels;
    });

    this.objectives.forEach(element => {
      this.dataSource.push(ResultTableCell.tableCell(element, this.inspectionStatistics));
    });
  }
}
