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
    public selected = 'generalInfo';
    public isClosed = false;
    public title = '';
    public inspectionId: string;
    public buildingId: string;
    public cityId: string;
    public idImplantationPlan: string;
    public idBuildingDetail: string;

    public constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private inspectionService: InspectionService
    ) {
        this.activeRoute.params.subscribe(param => {
            this.inspectionService.getGeneralInfo(param.idInspection).subscribe(data => {
                this.inspectionId = param.idInspection;

                this.title = data.mainBuildingAddress;
                this.buildingId = data.idBuilding;
                this.cityId = data.idCity;
                this.idBuildingDetail = data.idDetail;
                this.idImplantationPlan = data.idPictureSitePlan;
            });
        });
    }

    public ngOnInit() {
    }

    public sectionChange(section) {
        this.selected = section;
    }

    public isBuildingSection() {
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

    public approve() {
        this.inspectionService.approve(this.inspectionId).subscribe(() => this.isClosed = true);
    }

    public refuse() {
        this.inspectionService.refuse(this.inspectionId).subscribe(() => this.isClosed = true);
    }

    public cancel() {
        this.inspectionService.cancel(this.inspectionId).subscribe(() => this.isClosed = true);
    }

    public close() {
        this.router.navigate(['inspection/dashboard']);
    }
}
