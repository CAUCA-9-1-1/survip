import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../../inspection-dashboard/shared/services/inspection.service';


@Component({
    selector: 'app-general-building-info',
    templateUrl: './general-building-info.component.html',
    styleUrls: ['./general-building-info.component.scss']
})
export class GeneralBuildingInfoComponent implements OnInit {
    @Input() inspectionId: string;

    generalInfo: any = {};

    constructor(
        private inspectionService: InspectionService
    ) { }

    ngOnInit() {
        this.inspectionService.getBuildingGeneralInfo(this.inspectionId).subscribe(data => {
            this.generalInfo = data;
            console.log(data);
        });
    }
}
