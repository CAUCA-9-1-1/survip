import {Component, OnInit, ViewChild} from '@angular/core';
import {CauseManagementGroupComponent} from '@cause-911/management';
@Component({
    selector: 'app-management-system-permission',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    providers: [
    ]
})
export class GroupsComponent implements OnInit {
    @ViewChild(CauseManagementGroupComponent, {static : true}) groupComponent: CauseManagementGroupComponent;
    constructor(
    ) {
    }

    ngOnInit(): void {
        this.groupComponent.getGroups();
    }
}
