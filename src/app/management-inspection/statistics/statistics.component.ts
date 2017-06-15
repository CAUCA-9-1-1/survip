import {DatePipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {environment} from 'environments/environment';
import {DxChartComponent} from 'devextreme-angular';

import {StatisticService} from '../shared/services/statistic.service';

@Component({
  selector: 'app-management-inspection-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.styl'],
  providers: [StatisticService]
})
export class StatisticsComponent implements OnInit {
  @ViewChildren(DxChartComponent) charts: QueryList<DxChartComponent>;

  stats: object[] = [];
  period: object = {};

  constructor(private statisticService: StatisticService) {
    const start = new Date();
    const today = new Date();
    const datePipe = new DatePipe(environment.locale);

    start.setMonth(start.getMonth() - 1);

    this.period['end'] = datePipe.transform(today, 'yyyy-MM-dd');
    this.period['start'] = datePipe.transform(start, 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

  onShowing() {
    this.updateData();
  }

  onFormUpdated(e) {
    this.updateData();
  }

  onCustomizeTooltip(args) {
    return {
      html: '<b>' + args.argumentText + '</b> : ' + args.value
    };
  }

  private updateData() {
    this.loadStats();

    this.charts.forEach((chart) => {
      chart.instance.render();
    });
  }

  private loadStats() {
    this.statisticService.get(this.period['start'] + '/' + this.period['end']).subscribe(data => this.stats = data);
  }
}
