import {Component, Input, OnInit} from '@angular/core';

import {InspectionCourseService} from '../shared/services/inspection-course.service';
import {FirestationService} from '../../management-access/shared/services/firestation.service';
import {Firestation} from '../../management-access/shared/models/firestation.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {Lane} from '../../management-address/shared/models/lane.model';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-inspection-course',
    templateUrl: './inspection-course.component.html',
    styleUrls: ['./inspection-course.component.scss'],
    providers: [
        InspectionCourseService,
        FirestationService,
        LaneService
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
    firestations: Firestation[];
    lookupLanes = {
        valueExpr: 'id',
        displayExpr: 'name',
        dataSource: [],
    };
    lookupDirection = {
        valueExpr: 'id',
        displayExpr: 'name',
        dataSource: [],
    };

    constructor(
        private inspectionCourseService: InspectionCourseService,
        private firestationService: FirestationService,
        private laneService: LaneService,
        private translateService: TranslateService,
    ) {
        this.translateService.get(['right', 'left']).subscribe(labels => {
            this.lookupDirection.dataSource = [{
                id: 0,
                name: labels['left']
            }, {
                id: 1,
                name: labels['right']
            }];
        });
    }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.firestationService.getAll().subscribe(data => this.firestations = data);
        this.laneService.localized().subscribe( data => this.lookupLanes.dataSource = data);

        this.inspectionCourseService.getCourse(this.idInspection).subscribe(data => {
            this.courses = data.sort((a, b) => {
                return a.description > b.description ? 1 : -1;
            });

            data.forEach((course, index) => {
                this.inspectionCourseService.getCourseLane(course.id).subscribe(infos => {
                    const lanes = infos.lanes.sort((a, b) => {
                        return a.sequence > b.sequence ? 1 : -1;
                    });

                    this.courses[index].idFirestation = infos.course['idFirestation'];
                    this.courses[index].lanes = [];

                    lanes.forEach((courselane) => {
                        this.inspectionCourseService.getCourseLaneDetail(courselane.id).subscribe(lane => {
                            lane.description = courselane.description;

                            this.courses[index].lanes.push(lane);
                        });
                    });
                });
            });
        });
    }

    moveUp(field) {
        if (field.rowIndex > 0) {
            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, (field.data.sequence - 1));

            field.component.editCell(field.rowIndex - 1, 0);
            field.component.cellValue(field.rowIndex - 1, 0, field.data.sequence);

            field.component.saveEditData();
        }
    }

    moveDown(field) {
        if (field.rowIndex < field.component.totalCount() - 1) {
            field.component.editCell(field.rowIndex + 1, 0);
            field.component.cellValue(field.rowIndex + 1, 0, field.data.sequence);

            field.component.editCell(field.rowIndex, 0);
            field.component.cellValue(field.rowIndex, 0, field.data.sequence + 1);

            field.component.saveEditData();
        }
    }

    activeEditMode(idCourse: string) {
        if (this.modeEdit) {
            this.save();
        } else {
            this.modeEdit = true;
        }
    }

    deleteCourse(idCourse: string) {
        if (this.modeEdit) {
            this.modeEdit = false;
        } else {
            this.inspectionCourseService.deleteCourse(idCourse).subscribe();
        }
    }

    save() {
        this.modeEdit = false;
    }
}
