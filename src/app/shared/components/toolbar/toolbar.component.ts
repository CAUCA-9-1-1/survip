import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  private items = [{
    name: 'À faire',
    path: '/intervention/survey'
  },
  {
    name: 'Carto',
    path: '/intervention/maps'
  },
  {
    name: 'Recherche',
    path: '/intervention/report'
  },
  {
    name: 'Prev.',
    path: '/prevention/survey'
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path) {
    this.router.navigate([path]);
  }

}
