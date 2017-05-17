import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.styl']
})
export class WaitDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<WaitDialogComponent>) { }

  ngOnInit() {
  }
}
