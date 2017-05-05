import {Component, Input, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.styl']
})
export class YesNoDialogComponent implements OnInit {

  @Input() title: string;
  @Input() question: string;

  constructor(public dialogRef: MdDialogRef<YesNoDialogComponent>) { }

  ngOnInit() {
  }
}
