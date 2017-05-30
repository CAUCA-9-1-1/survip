import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  public items = [{
    name: 'accessManagement',
    path: '/management/access/',
    popMenu: false
  }, {
    name: 'addressManagement',
    path: '/management/address/',
    popMenu: false
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path) {
    this.router.navigate([path]);
  }

}
