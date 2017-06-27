import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  public items = [{
    name: 'inspectionManagement',
    path: '/management/inspection/',
    popMenu: false
  }, {
    name: 'interventionPlanManagement',
    path: '/management/interventionplan/',
    popMenu: false
  }, {
    name: 'surveyManagement',
    path: '/management/survey/',
    popMenu: false
  }, {
    name: 'buildingManagement',
    path: '/management/building/',
    popMenu: false
  }, {
    name: 'addressManagement',
    path: '/management/address/',
    popMenu: false
  }, {
    name: 'fireHydrantManagement',
    path: '/management/firehydrant/',
    popMenu: false
  }, {
    name: 'accessManagement',
    path: '/management/access/',
    popMenu: false
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path) {
    this.router.navigate([path]);
  }

}
