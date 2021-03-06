import {Component, Input, OnInit} from '@angular/core';

import {InspectionPictureService} from '../shared/services/inspection-picture.service';
import {Picture} from '../../shared/models/picture.model';
import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-inspection-implantation-plan',
    templateUrl: './inspection-implantation-plan.component.html',
    styleUrls: ['./inspection-implantation-plan.component.scss'],
    providers: [
        InspectionPictureService,
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

    public picturePlan = '';

    public constructor(
        private pictureService: InspectionPictureService,
        private inspectionService: InspectionService,
    ) { }

    public ngOnInit() {
    }

    public uploadImage(e) {
        this.picture = e;
        let hasChangedId = false;
        if (this.idImplantationPlan !== null) {
            this.picture.id = this.idImplantationPlan;
            hasChangedId = true;
        }
        this.picturePlan = e.dataUri;
        this.saveImage();
        if (hasChangedId){
            this.idImplantationPlan = this.picture.id;
        }
    }

    private loadData() {
        if (!this.idImplantationPlan) {
            return null;
        }

        this.pictureService.getOne(this.idImplantationPlan).subscribe(data => {
            this.picturePlan = data['dataUri'];
            this.picture = data;
        });
    }

    private saveImage() {
        if (this.picture) {
            this.pictureService.save(this.picture).subscribe(id => {
              this.implantationPlan = id;
              this.inspectionService.saveImplantationPlan(this.idBuildingDetail, id).subscribe();
            });
        }
    }
}
