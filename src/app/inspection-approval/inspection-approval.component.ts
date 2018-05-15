import { Component, OnInit } from '@angular/core';
import {InspectionService} from '../inspection-dashboard/shared/services/inspection.service';
import {ActivatedRoute} from '@angular/router';

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

    private inspectionId: string;

    constructor(
        private activeRoute: ActivatedRoute,
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
        this.inspectionService.approve(this.inspectionId).subscribe();
    }

    refuse() {
        this.inspectionService.refuse(this.inspectionId).subscribe();
    }

    cancel() {
        this.inspectionService.cancel(this.inspectionId).subscribe();
    }
}
