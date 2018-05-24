import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-inspection-survey',
    templateUrl: './inspection-survey.component.html',
    styleUrls: ['./inspection-survey.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class InspectionSurveyComponent implements OnInit {
    @Input() inspectionId: string;

    summary: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
        this.inspectionService.getSurveySummary(this.inspectionId).subscribe(data => {
            this.summary = data;
        });
    }

}
