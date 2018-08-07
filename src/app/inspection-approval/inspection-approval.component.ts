import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {InspectionService} from './shared/services/inspection.service';


@Component({
    selector: 'app-inspection-approval',
    templateUrl: './inspection-approval.component.html',
    styleUrls: ['./inspection-approval.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class InspectionApprovalComponent implements OnInit {
    selected = 'generalInfo';
    isClosed = false;
    title = '';
    inspectionId: string;
    idImplantationPlan: string;
    idBuildingDetail: string;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private inspectionService: InspectionService
    ) {
        this.activeRoute.params.subscribe(param => {
            this.inspectionId = param.idInspection;

            this.inspectionService.getGeneralInfo(param.idInspection).subscribe(data => {
                this.title = data.mainBuildingAddress;
                this.idBuildingDetail = data.idDetail;
                this.idImplantationPlan = data.idPictureSitePlan;
            });
        });
    }

    ngOnInit() {
    }

    sectionChange(section) {
        this.selected = section;
    }

    isBuildingSection() {
        return (
            this.selected === 'buildingDetails' ||
            this.selected === 'contacts' ||
            this.selected === 'pnaps' ||
            this.selected === 'hazardousMaterials' ||
            this.selected === 'fireProtection' ||
            this.selected === 'particularRisks' ||
            this.selected === 'anomalies' ? true : false
        );
    }

    approve() {
        this.inspectionService.approve(this.inspectionId).subscribe(() => this.isClosed = true);
    }

    refuse() {
        this.inspectionService.refuse(this.inspectionId).subscribe(() => this.isClosed = true);
    }

    cancel() {
        this.inspectionService.cancel(this.inspectionId).subscribe(() => this.isClosed = true);
    }

    close() {
        this.router.navigate(['inspection/dashboard']);
    }
}
