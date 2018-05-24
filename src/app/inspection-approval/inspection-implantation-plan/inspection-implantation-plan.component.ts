import {Component, Input, OnInit} from '@angular/core';

import {PictureService} from '../../shared/services/picture.service';


@Component({
    selector: 'app-inspection-implantation-plan',
    templateUrl: './inspection-implantation-plan.component.html',
    styleUrls: ['./inspection-implantation-plan.component.scss'],
    providers: [
        PictureService,
    ],
})
export class InspectionImplantationPlanComponent implements OnInit {
    @Input()
    set implantationPlan(id: string) {
        this.idImplantationPlan = id;
        this.picturePlan = '';
        this.loadData();
    }

    private idImplantationPlan: string;

    picturePlan: string;

    constructor(
        private pictureService: PictureService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idImplantationPlan) {
            return null;
        }

        this.pictureService.get(this.idImplantationPlan).subscribe(data => {
            this.picturePlan = 'data:image/jpeg;base64,' + data['picture'];
        });
    }

}
