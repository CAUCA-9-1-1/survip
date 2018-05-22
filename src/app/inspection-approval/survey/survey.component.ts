import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class SurveyComponent implements OnInit {
    @Input() inspectionId: string;

    summary: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
        this.inspectionService.getSurveySummary(this.inspectionId).subscribe(data => {
            console.log(data);
            this.summary = data;
        });
    }

}
