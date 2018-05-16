import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../../inspection-dashboard/shared/services/inspection.service';

@Component({
    selector: 'app-building-details',
    templateUrl: './building-details.component.html',
    styleUrls: ['./building-details.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingDetailsComponent implements OnInit {
    @Input() idBuilding: string;

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
        this.inspectionService.getBuildingDetail(this.idBuilding).subscribe(data => {
            console.log(data);
        });
    }

}
