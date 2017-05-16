import {Component, Input, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-fullscreen-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.styl']
})
export class WaitDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<WaitDialogComponent>) { }

  ngOnInit() {
  }
}
