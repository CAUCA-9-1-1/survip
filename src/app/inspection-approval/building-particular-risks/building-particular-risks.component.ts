import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';
import {InspectionBuildingParticularRiskService} from '../shared/services/inspection-building-particular-risk.service';
import {TranslateService} from '@ngx-translate/core';
import {StaticDataService} from '../../shared/services/static-data.service';


@Component({
    selector: 'app-building-particular-risks',
    templateUrl: './building-particular-risks.component.html',
    styleUrls: ['./building-particular-risks.component.scss'],
    providers: [
        InspectionService,
        InspectionBuildingParticularRiskService,
        StaticDataService,
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

    public labels: string[];
    public pictures: any[] = [];
    public risks: any[] = [];
    public walls: any[] = [];
    public sectors: any[] = [];

    constructor(
        private inspectionService: InspectionService,
        private particularRisksService: InspectionBuildingParticularRiskService,
        private staticService: StaticDataService,
        private translateService: TranslateService,
    ) {
        this.translateService.get([
            'risks.foundation', 'risks.floor', 'risks.walls', 'risks.roof'
        ]).subscribe(data => {
            this.labels = [
                data['risks.foundation'],
                data['risks.floor'],
                data['risks.walls'],
                data['risks.roof'],
            ];
        });
    }

    public ngOnInit() {
        this.walls = this.staticService.getWalls();
        this.sectors = this.staticService.getSectors();
    }

    public onChange(e) {
        const name = e.component.option('name');
        const [key, index] = name.split('.');

        if (this.idBuilding && this.risks[index][key] !== e.component.option('value')) {
            this.risks[index][key] = e.component.option('value');
            this.risks[index]['idBuilding'] = this.idBuilding;

            switch (index) {
                case '0':
                    this.particularRisksService.saveFoundation(this.risks[index]).subscribe();
                    break;
                case '1':
                    this.particularRisksService.saveFloor(this.risks[index]).subscribe();
                    break;
                case '2':
                    this.particularRisksService.saveWall(this.risks[index]).subscribe();
                    break;
                case '3':
                    this.particularRisksService.saveRoof(this.risks[index]).subscribe();
                    break;
            }
        }
    }

    private resetData() {
        this.risks = [{}, {}, {}, {}];
        this.pictures = [[], [], [], []];
    }

    private loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.particularRisksService.getFoundation(this.idBuilding).subscribe(data => {
            this.risks[0] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push(image['dataUri']);
                });

                this.pictures[0] = images;
            });
        });
        this.particularRisksService.getFloor(this.idBuilding).subscribe(data => {
            this.risks[1] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push(image['dataUri']);
                });

                this.pictures[1] = images;
            });
        });
        this.particularRisksService.getWall(this.idBuilding).subscribe(data => {
            this.risks[2] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push(image['dataUri']);
                });

                this.pictures[2] = images;
            });
        });
        this.particularRisksService.getRoof(this.idBuilding).subscribe(data => {
            this.risks[3] = data;
            const images = [];

            this.particularRisksService.getPictures(data.id).subscribe( pictures => {
                pictures.forEach(image => {
                    images.push(image['dataUri']);
                });

                this.pictures[3] = images;
            });
        });
    }
}
