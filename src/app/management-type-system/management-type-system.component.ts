import {Component, OnInit} from '@angular/core';

import {AuthGuardService} from '../shared/services/auth-guard.service';


@Component({
    selector: 'app-management-type-system',
    templateUrl: './management-type-system.component.html',
    styleUrls: ['./management-type-system.component.scss']
})
export class ManagementTypeSystemComponent implements OnInit {
    public selectedTab = 0;
    public accessTo = {
        cityType: false,
        connectionType: false,
        fireHydrantType: false,
        operatorType: false,
        PRAType: false,
        unitOfMeasure: false,
    };

    public constructor(
        private authGuardService: AuthGuardService,
    ) { }

    public ngOnInit() {
        this.accessTo.cityType = this.authGuardService.hasRight('RightCityTypeManagement');
        this.accessTo.connectionType = this.authGuardService.hasRight('RightConnectionTypeManagement');
        this.accessTo.fireHydrantType = this.authGuardService.hasRight('RightFireHydrantTypeManagement');
        this.accessTo.operatorType = this.authGuardService.hasRight('RightOperatorManagement');
        this.accessTo.PRAType = this.authGuardService.hasRight('RightRPATypeManagement');
        this.accessTo.unitOfMeasure = this.authGuardService.hasRight('RightUnitManagement');
    }

    public onSelectionChanged(e) {
        this.selectedTab = e.index;
    }
}
