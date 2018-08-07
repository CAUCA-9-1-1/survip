import {Component, Input, OnInit} from '@angular/core';

import {PictureService} from '../../shared/services/picture.service';
import {Picture} from '../../shared/models/picture.model';
import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-inspection-implantation-plan',
    templateUrl: './inspection-implantation-plan.component.html',
    styleUrls: ['./inspection-implantation-plan.component.scss'],
    providers: [
        PictureService,
    ],
})
export class InspectionImplantationPlanComponent implements OnInit {
    @Input() idBuildingDetail: string;
    @Input()
    set implantationPlan(id: string) {
        this.idImplantationPlan = id;
        this.picturePlan = '';
        this.loadData();
    }
    get implantationPlan() {
        return this.idImplantationPlan;
    }

    private idImplantationPlan: string;
    private picture: Picture;

    picturePlan = '';
    modeEdit = false;

    constructor(
        private pictureService: PictureService,
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idImplantationPlan) {
            return null;
        }

        this.pictureService.getOne(this.idImplantationPlan).subscribe(data => {
            this.picturePlan = data['dataUri'];
        });
    }

    activeEditMode() {
        if (this.modeEdit) {
            this.saveImage();
        } else {
            this.modeEdit = true;
        }
    }

    uploadImage(e) {
        this.picture = e;
        this.picture.id = undefined;

        this.picturePlan = e.dataUri;
    }

    saveImage() {
        this.modeEdit = false;

        this.pictureService.save(this.picture).subscribe(id => {
            this.inspectionService.saveImplantationPlan(this.idBuildingDetail, id).subscribe();
        });
    }
}
