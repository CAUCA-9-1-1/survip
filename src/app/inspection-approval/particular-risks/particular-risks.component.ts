import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';
import {InspectionBuildingParticularRiskService} from '../shared/services/inspection-building-particular-risk.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-particular-risks',
    templateUrl: './particular-risks.component.html',
    styleUrls: ['./particular-risks.component.scss'],
    providers: [
        InspectionService,
        InspectionBuildingParticularRiskService,
    ]
})
export class ParticularRisksComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.particularRisks = [];
        this.loadData();
    }

    private idBuilding: string;
    private labels: string[];

    particularRisks: any = [];

    constructor(
        private inspectionService: InspectionService,
        private particularRisksService: InspectionBuildingParticularRiskService,
        private translateService: TranslateService,
    ) {
        this.translateService.get([
            'risks.floor', 'risks.foundation', 'risks.wall', 'risks.roof'
        ]).subscribe(data => {
            this.labels = data;
        });
    }

    ngOnInit() {
    }

    loadData() {
        this.particularRisksService.getFoundation(this.idBuilding).subscribe(data => {
            this.particularRisks[0] = {
                description: this.labels['risks.foundation'],
                risks: data,
                pictures: [],
            };

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach((image, index) => {
                    this.particularRisks[0].pictures.push('data:image/jpeg;base64,' + image['pictureData']);
                });
            });
        });
        this.particularRisksService.getFloor(this.idBuilding).subscribe(data => {
            this.particularRisks[1] = {
                description: this.labels['risks.floor'],
                risks: data,
                pictures: [],
            };

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach((image, index) => {
                    this.particularRisks[1].pictures.push('data:image/jpeg;base64,' + image['pictureData']);
                });
            });
        });
        this.particularRisksService.getWall(this.idBuilding).subscribe(data => {
            this.particularRisks[2] = {
                description: this.labels['risks.wall'],
                risks: data,
                pictures: [],
            };

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach((image, index) => {
                    this.particularRisks[2].pictures.push('data:image/jpeg;base64,' + image['pictureData']);
                });
            });
        });
        this.particularRisksService.getRoof(this.idBuilding).subscribe(data => {
            this.particularRisks[3] = {
                description: this.labels['risks.roof'],
                risks: data,
                pictures: [],
            };

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach((image, index) => {
                    this.particularRisks[3].pictures.push('data:image/jpeg;base64,' + image['pictureData']);
                });
            });
        });
    }
}
