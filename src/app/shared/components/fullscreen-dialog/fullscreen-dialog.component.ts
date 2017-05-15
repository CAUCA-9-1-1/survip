import {Component, Input, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-fullscreen-dialog',
  templateUrl: './fullscreen-dialog.component.html',
  styleUrls: ['./fullscreen-dialog.component.styl']
})
export class FullscreenDialogComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;

  constructor(public dialogRef: MdDialogRef<FullscreenDialogComponent>) { }

  ngOnInit() {
  }
}
