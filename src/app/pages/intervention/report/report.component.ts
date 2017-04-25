import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../../shared/window-ref.service';

@Component({
  selector: 'app-intervention-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.styl']
})
export class ReportComponent implements OnInit {

  constructor(private windowRef: WindowRefService) {}

  ngOnInit() {
  }
}
