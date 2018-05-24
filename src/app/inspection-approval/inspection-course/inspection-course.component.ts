import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-inspection-course',
    templateUrl: './inspection-course.component.html',
    styleUrls: ['./inspection-course.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class InspectionCourseComponent implements OnInit {
    @Input() inspectionId: string;

    courses: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
        this.inspectionService.getCourse(this.inspectionId).subscribe(data => {
            this.courses = data.sort((a, b) => {
                return a.description > b.description ? 1 : -1;
            });

            data.forEach((course, index) => {
                this.inspectionService.getCourseLane(course.id).subscribe(infos => {
                    const lanes = infos.lanes.sort((a, b) => {
                        return a.sequence > b.sequence ? 1 : -1;
                    });

                    this.courses[index].lanes = lanes;
                });
            });
        });
    }
}
