import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-management-fire-hydrant',
    templateUrl: './management-fire-hydrant.component.html',
    styleUrls: ['./management-fire-hydrant.component.scss']
})
export class ManagementFireHydrantComponent implements OnInit {
    selectedTab = 0;

    constructor() { }

    ngOnInit() { }

    onSelectionChanged(e) {
        this.selectedTab = e.index;
    }
}
