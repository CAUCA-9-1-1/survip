import {Component, Input, OnInit} from '@angular/core';

import {InspectionBuildingAnomalyService} from '../shared/services/inspection-building-anomaly.service';
import {BuildingAnomaly} from '../../management-building/shared/models/building-anomaly.model';


@Component({
    selector: 'app-building-anomalies',
    templateUrl: './building-anomalies.component.html',
    styleUrls: ['./building-anomalies.component.scss'],
    providers: [
        InspectionBuildingAnomalyService,
    ]
})
export class BuildingAnomaliesComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.anomalies = [];
        this.loadData();
    }

    private idBuilding: string;

    anomalies: BuildingAnomaly[] = [];

    constructor(
        private anomalyService: InspectionBuildingAnomalyService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.anomalyService.getBuildingAnomaly(this.idBuilding).subscribe(data => {
            this.anomalies = data;

            data.forEach((theme, indexTheme) => {
                theme.anomalies.forEach((anomaly, indexAnomaly) => {
                    this.anomalyService.getPictures(anomaly.id).subscribe( pictures => {
                        this.anomalies[indexTheme].anomalies[indexAnomaly].pictures = [];

                        pictures.forEach(image => {
                            this.anomalies[indexTheme]
                                .anomalies[indexAnomaly]
                                .pictures.push('data:image/jpeg;base64,' + image['pictureData']);
                        });
                    });
                });
            });
        });
    }
}
