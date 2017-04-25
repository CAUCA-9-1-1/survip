import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-toolbar',
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
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path) {
    this.router.navigate([path]);
  }

}