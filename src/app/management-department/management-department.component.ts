import {Component, OnInit} from '@angular/core';

import {AuthGuardService} from '../shared/services/auth-guard.service';


@Component({
    selector: 'app-management-department',
    templateUrl: './management-department.component.html',
    styleUrls: ['./management-department.component.scss']
})
export class ManagementDepartmentComponent implements OnInit {
    public accessTo = {
        building: false,
        departmentRiskLevel: false,
        fireHydrant: false,
        firestation: false,
        lane: false,
    };

    public constructor(
        private authGuardService: AuthGuardService,
    ) { }

    public ngOnInit() {
        this.accessTo.building = this.authGuardService.hasRight('RightBuildingManagement');
        this.accessTo.departmentRiskLevel = this.authGuardService.hasRight('RightDepartmentRiskLevel');
        this.accessTo.fireHydrant = this.authGuardService.hasRight('RightFireHydrantManagement');
        this.accessTo.firestation = this.authGuardService.hasRight('RightFireStationManagement');
        this.accessTo.lane = this.authGuardService.hasRight('RightLaneManagement');
    }
}
