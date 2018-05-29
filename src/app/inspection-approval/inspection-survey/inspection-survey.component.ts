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
    @Input()
    set inspection(id: string) {
        this.idInspection = id;
        this.loadData();
    }

    idInspection: string;
    summary: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.inspectionService.getSurveySummary(this.idInspection).subscribe(data => {
            this.summary = data;
        });
    }

}
