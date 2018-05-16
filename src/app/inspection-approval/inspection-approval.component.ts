import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InspectionService} from '../inspection-dashboard/shared/services/inspection.service';


@Component({
    selector: 'app-inspection-approval',
    templateUrl: './inspection-approval.component.html',
    styleUrls: ['./inspection-approval.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class InspectionApprovalComponent implements OnInit {
    selected = 'buildingDetails';
    isClosed = false;

    private inspectionId: string;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private inspectionService: InspectionService
    ) {
        this.activeRoute.params.subscribe(param => {
            this.inspectionId = param.idInspection;
        });
    }

    ngOnInit() {
    }

    sectionChange(section) {
        this.selected = section;
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
