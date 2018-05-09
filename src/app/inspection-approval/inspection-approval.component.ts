import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-inspection-approval',
    templateUrl: './inspection-approval.component.html',
    styleUrls: ['./inspection-approval.component.scss']
})
export class InspectionApprovalComponent implements OnInit {
    selected = 'buildingDetails';

    constructor() { }

    ngOnInit() {
    }

    sectionChange(section) {
        this.selected = section;
    }
}
