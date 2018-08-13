import {Component, Input, OnInit} from '@angular/core';

import {InspectionCourseService} from '../shared/services/inspection-course.service';
import {FirestationService} from '../../management-access/shared/services/firestation.service';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {TranslateService} from '@ngx-translate/core';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Course} from '../shared/models/course.model';


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
export class InspectionCourseComponent extends GridWithCrudService implements OnInit {
    @Input() idBuilding = '';
    @Input()
    set inspection(id: string) {
        this.idInspection = id;
        this.loadData();
    }

    private idInspection: string;
    courses: any = [];
    formCourseLaneField: any;
    lookupFirestations = {
        valueExpr: 'id',
        displayExpr: 'name',
        dataSource: [],
    };
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
        inspectionCourseService: InspectionCourseService,
        private firestationService: FirestationService,
        private laneService: LaneService,
        private translateService: TranslateService,
    ) {
        super(inspectionCourseService);

        this.translateService.get(['right', 'left', 'straightAhead']).subscribe(labels => {
            this.lookupDirection.dataSource = [{
                id: 0,
                name: labels['left']
            }, {
                id: 1,
                name: labels['right']
            }, {
                id: 2,
                name: labels['straightAhead']
            }];
        });
    }

    setModel(data: any) {
        return Course.fromJSON(data);
    }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.laneService.localized().subscribe( data => this.lookupLanes.dataSource = data);
        this.firestationService.getAll().subscribe(data => this.lookupFirestations.dataSource = data);
        this.loadSource(this.idInspection);
    }

    getDirection(direction) {
        if (direction === 2) {
            return '';
        }

        const result = this.lookupDirection.dataSource.filter(dir => dir.id === direction);

        return ' (' + result[0].name + ')';
    }

    getLaneName(idLane: string) {
        const result = this.lookupLanes.dataSource.filter(lane => lane.id === idLane);

        if (result.length) {
            return result[0].name;
        }

        return '';
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

    setFormCourseLaneField(field) {
        this.formCourseLaneField = field;

        if (!this.formCourseLaneField.value) {
            this.formCourseLaneField.value = [];
        }
    }

    onNewCourse(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.isActive = true;
        e.data.lanes = [];
    }

    onNewLane(e) {
        e.data.sequence = this.formCourseLaneField.data.lanes ? this.formCourseLaneField.data.lanes.length + 1 : 1;
        e.data.idBuildingCourse = this.formCourseLaneField.data.id;
        e.data.isActive = true;
    }

    onLaneInserted(e) {
        this.formCourseLaneField.setValue(this.formCourseLaneField.data.lanes);
    }

    onLaneUpdated(e) {
        this.formCourseLaneField.setValue(this.formCourseLaneField.data.lanes);
    }

    onLaneRemoved(e) {
        this.formCourseLaneField.setValue(this.formCourseLaneField.data.lanes);

        if (this.formCourseLaneField.data.lanes.length === 0) {
            this.formCourseLaneField.setValue(false);
        }
    }
}
