import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intervention-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.styl']
})
export class ReportComponent implements OnInit {

  public menuItems = [
    {
      name: 'maps',
      title: 'Carte',
      tooltip: 'Carte'
    },
    {
      name: 'report',
      title: 'Rapport',
      tooltip: 'Rapport'
    },
    {
      name: 'survey',
      title: 'Sondage',
      tooltip: 'Sondage'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
