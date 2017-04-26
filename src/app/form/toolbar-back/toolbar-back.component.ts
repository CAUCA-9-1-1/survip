import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-toolbarback',
  templateUrl: './toolbar-back.component.html',
  styleUrls: ['./toolbar-back.component.styl']
})
export class ToolbarBackComponent implements OnInit {
  @Input() title: string;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
