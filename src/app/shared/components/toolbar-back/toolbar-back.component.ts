import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar-back',
  templateUrl: './toolbar-back.component.html',
  styleUrls: ['./toolbar-back.component.styl']
})
export class ToolbarBackComponent implements OnInit {
  @Input() title: string;
  @Input() mode = 'side';
  @Input() sidenav = null;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  open() {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  back() {
    this.location.back();
  }
}
