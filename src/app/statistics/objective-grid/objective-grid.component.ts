import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Objective } from '../../statistics/shared/models/objective.model';
import { ResultTableCell } from '../../statistics/shared/models/result-table-cell.model';
import { InspectionForStatistics } from '../../statistics/shared/models/inspection-for-statistics.model';


@Component({
  selector: 'app-objective-grid',
  templateUrl: './objective-grid.component.html',
  styleUrls: ['./objective-grid.component.scss']
})
export class ObjectiveGridComponent implements OnInit, OnChanges {
  @Input() isHighRisk = false;
  @Input() objectives: Objective[] = null;
  @Input() inspectionStatistics: InspectionForStatistics[] = null;

  public dataSource: ResultTableCell[] = [];

  public labels: string[];

  get isEverythingLoaded(): boolean {
    return (this.objectives != null && this.inspectionStatistics != null);
}

  get title() {
    return (this.isHighRisk) ? this.labels['highRisk'] : this.labels['lowRisk'];
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
  }

  public ngOnChanges() {
    if (this.isEverythingLoaded) {
      this.dataSource = ResultTableCell.tableCells(this.objectives, this.inspectionStatistics, this.isHighRisk);
    }
  }
}
