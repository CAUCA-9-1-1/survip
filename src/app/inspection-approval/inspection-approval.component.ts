import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

import {InspectionService} from './shared/services/inspection.service';
import {AskConfirmationComponent} from './ask-confirmation/ask-confirmation.component';


@Component({
    selector: 'app-inspection-approval',
    templateUrl: './inspection-approval.component.html',
    styleUrls: ['./inspection-approval.component.scss'],
    providers: [
        InspectionService,
        TranslateService
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

    private labels: any = {};

    public constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private inspectionService: InspectionService,
        private dialog: MatDialog,
        private notification: MatSnackBar,
        private translateService: TranslateService,
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
        const dialogRef = this.dialog.open(AskConfirmationComponent, {
            width: '500px',
            data: {
                title: 'approve',
                message: 'approveQuestion',
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.inspectionService.approve(this.inspectionId).subscribe(() => this.isClosed = true);
            }
        });
    }

    public refuse() {
        const dialogRef = this.dialog.open(AskConfirmationComponent, {
            width: '500px',
            data: {
                title: 'refuse',
                message: 'refuseQuestion',
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.inspectionService.refuse(this.inspectionId, result.reason).subscribe(() => this.isClosed = true);
            }
        });
    }

    public cancel() {
        const dialogRef = this.dialog.open(AskConfirmationComponent, {
            width: '500px',
            data: {
                title: 'cancelInspection',
                message: 'cancelInspectionQuestion',
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.inspectionService.cancel(this.inspectionId).subscribe(() => this.isClosed = true);
            }
        });
    }

    public close() {
        this.router.navigate(['inspection/dashboard']);
    }
}
