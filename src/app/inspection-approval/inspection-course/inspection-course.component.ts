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
    @Input()
    set inspection(id: string) {
        this.idInspection = id;
        this.loadData();
    }

    private idInspection: string;
    courses: any = [];
    modeEdit = false;

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.inspectionService.getCourse(this.idInspection).subscribe(data => {
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

    activeEditMode(idCourse) {
        if (this.modeEdit) {
            this.save();
        } else {
            this.modeEdit = true;
        }
    }

    save() {
        this.modeEdit = false;
    }
}
