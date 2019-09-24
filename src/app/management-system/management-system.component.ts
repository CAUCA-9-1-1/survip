import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {AuthGuardService} from '../shared/services/auth-guard.service';


@Component({
    selector: 'app-management-survey',
    templateUrl: './management-system.component.html',
    styleUrls: ['./management-system.component.scss']
})
export class ManagementSystemComponent implements OnInit {
    public selectedSurvey = null;
    public accessTo = {
        department: false,
        hazardousMaterial: false,
        permission: false,
        riskLevel: false,
        utilisationCode: false,
        webuser: false,
    };
    showGroupTab = false;
    showUserTab = true;

    public constructor(
        private activeRoute: ActivatedRoute,
        private authGuardService: AuthGuardService,
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            if (params.id_survey) {
                this.selectedSurvey = params.id_survey;
            } else {
                this.selectedSurvey = null;
            }
        });
    }

    ngOnInit() {
        this.accessTo.department = this.authGuardService.hasRight('RightDepartmentManagement');
        this.accessTo.hazardousMaterial = this.authGuardService.hasRight('RightHazardousMaterialManagement');
        this.accessTo.permission = this.authGuardService.hasRight('RightPermissionManagement');
        this.accessTo.riskLevel = this.authGuardService.hasRight('RightRiskLevelManagement');
        this.accessTo.webuser = this.authGuardService.hasRight('RightUserManagement');
        this.accessTo.utilisationCode = this.authGuardService.hasRight('RightUtilisationCodeManagement');
    }

    selectedIndexChanged(e) {
        this.showGroupTab = e.index === 1;
        this.showUserTab = e.index === 0;
    }
}
