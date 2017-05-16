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
    path: '/intervention/list',
    popMenu: false
  },
  {
    name: 'Carto',
    path: '/intervention/maps',
    popMenu: false
  },
  {
    name: 'Visualiser...',
    path: '',
    popMenu: true
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path) {
    this.router.navigate([path]);
  }

}
