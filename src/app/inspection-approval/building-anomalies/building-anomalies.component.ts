import {Component, Input, OnInit} from '@angular/core';

import {InspectionBuildingAnomalyService} from '../shared/services/inspection-building-anomaly.service';
import {BuildingAnomaly} from '../../management-department/shared/models/building-anomaly.model';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {PictureService} from '../../shared/services/picture.service';
import {BuildingAnomalyPicture} from '../../management-department/shared/models/building-anomaly-picture.model';
import {AskBatchDescriptionComponent} from '../../inspection-dashboard/ask-batch-description/ask-batch-description.component';
import {InspectionBatch} from '../../inspection-batch/shared/models/inspection-batch.model';
import {MatDialog} from '@angular/material';
import {AskNewThemeComponent} from '../ask-new-theme/ask-new-theme.component';
import {InspectionPictureService} from '../shared/services/inspection-picture.service';


@Component({
    selector: 'app-building-anomalies',
    templateUrl: './building-anomalies.component.html',
    styleUrls: ['./building-anomalies.component.scss'],
    providers: [
        InspectionBuildingAnomalyService,
        InspectionPictureService,
    ]
})
export class BuildingAnomaliesComponent extends GridWithCrudService implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.dataSource = [];

        if (this.idBuilding) {
            this.loadSource(this.idBuilding);
        }
    }

    public themes: any = {};

    private selectRow: any;
    private idBuilding: string;
    private formImageField: any;

    public constructor(
        anomalyService: InspectionBuildingAnomalyService,
        private pictureService: InspectionPictureService,
        private dialog: MatDialog,
    ) {
        super(anomalyService);
    }

    public ngOnInit() {
        this.sourceService.getTheme().subscribe(data => this.themes = data);
    }

    public setModel(data: any) {
        return BuildingAnomaly.fromJSON(data);
    }

    public getImages(field) {
        const images = [];

        this.formImageField = field;
        if (field.row.data.pictures) {
            field.row.data.pictures.forEach(image => {
                if (image.picture.id) {
                    images.push(image.picture.id);
                } else {
                    images.push(image.picture.dataUri);
                }
            });
        }

        return images;
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'theme') {
            e.editorName = 'dxSelectBox';
            e.editorOptions = {
                items: this.themes
            };
        }
    }

    public onInitNewRow(e) {
        this.selectRow = {};

        e.data.idBuilding = this.idBuilding;
        e.data.pictures = [];
        e.data.isActive = true;
    }

    public onEditingStart(e) {
        this.selectRow = e.data;
    }

    public addTheme(e) {
        const dialogRef = this.dialog.open(AskNewThemeComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.name) {
                this.themes.push(result.name);
            }
        });
    }

    public uploadPicture(picture) {
        const images = this.formImageField.value || [];

        if (picture.id) {
            this.pictureService.save(picture).subscribe();
        } else {
            if (this.selectRow.id) {
                const anomalyPicture = new BuildingAnomalyPicture();
                anomalyPicture.dataUri = picture.dataUri;
                anomalyPicture.idParent = this.selectRow.id || undefined;

                this.sourceService.savePicture(anomalyPicture).subscribe(idAnomalyPicture => {
                    images.push(idAnomalyPicture);

                    this.formImageField.setValue(images);
                });
            } else {
                images.push({
                    picture: picture
                });

                this.formImageField.setValue(images);
            }
        }
    }
}
