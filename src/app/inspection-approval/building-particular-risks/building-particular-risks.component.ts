import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';
import {InspectionBuildingParticularRiskService} from '../shared/services/inspection-building-particular-risk.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-building-particular-risks',
    templateUrl: './building-particular-risks.component.html',
    styleUrls: ['./building-particular-risks.component.scss'],
    providers: [
        InspectionService,
        InspectionBuildingParticularRiskService,
    ]
})
export class BuildingParticularRisksComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.resetData();
        this.loadData();
    }

    private idBuilding: string;

    description: string[];
    pictures: any[] = [];
    risks: any[] = [];

    constructor(
        private inspectionService: InspectionService,
        private particularRisksService: InspectionBuildingParticularRiskService,
        private translateService: TranslateService,
    ) {
        this.translateService.get([
            'risks.floor', 'risks.foundation', 'risks.wall', 'risks.roof'
        ]).subscribe(data => {
            this.description = [
                data['risks.foundation'],
                data['risks.floor'],
                data['risks.wall'],
                data['risks.roof'],
            ];
        });
    }

    ngOnInit() {
    }

    resetData() {
        this.risks = [{}, {}, {}, {}];
        this.pictures = [[], [], [], []];
    }

    loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.particularRisksService.getFoundation(this.idBuilding).subscribe(data => {
            this.risks[0] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push('data:image/jpeg;base64,' + image['pictureData']);
                });

                this.pictures[0] = images;
            });
        });
        this.particularRisksService.getFloor(this.idBuilding).subscribe(data => {
            this.risks[1] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push('data:image/jpeg;base64,' + image['pictureData']);
                });

                this.pictures[1] = images;
            });
        });
        this.particularRisksService.getWall(this.idBuilding).subscribe(data => {
            this.risks[2] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push('data:image/jpeg;base64,' + image['pictureData']);
                });

                this.pictures[2] = images;
            });
        });
        this.particularRisksService.getRoof(this.idBuilding).subscribe(data => {
            this.risks[3] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push('data:image/jpeg;base64,' + image['pictureData']);
                });

                this.pictures[3] = images;
            });
        });
    }
}
