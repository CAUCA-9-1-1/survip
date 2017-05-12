import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  private items = [{
    name: 'Liste',
    path: '/intervention/list'
  },
  {
    name: 'Carto',
    path: '/intervention/maps'
  },
  {
    name: 'Visualiser',
    path: '/intervention/report'
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path) {
    this.router.navigate([path]);
  }

}
