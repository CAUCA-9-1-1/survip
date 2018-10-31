import {Component, Input, OnInit} from '@angular/core';
import {InspectionBuildingAnomalyService} from '../shared/services/inspection-building-anomaly.service';
import {BuildingAnomaly} from '../../management-department/shared/models/building-anomaly.model';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {BuildingAnomalyPicture} from '../../management-department/shared/models/building-anomaly-picture.model';
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
    private imageList = [];

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
                if (image.picture) {
                    images.push(image.picture);
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

    public async onAddingNewRow(e) {
        e.key['pictures'] = [];
        await this.savePictureCollection();
        this.onRowInserted(e);
    }

    public async onModifyingRow(e) {
        e.key['pictures'] = [];
        await this.savePictureCollection();
        this.onRowUpdated(e);
    }

    private async savePictureCollection() {
        console.log('saving pictures');
        if (this.imageList.length > 0) {
            await this.sourceService.savePictureCollection(this.imageList).toPromise();
        }
    }

    public uploadPicture(picture) {
        const images = this.formImageField.value || [];

        if (picture.id) {
            this.pictureService.save(picture).subscribe();
        } else {
            if (this.selectRow.id) {
                picture.idParent = this.selectRow.id || undefined;
                const anomalyPicture = new BuildingAnomalyPicture();
                anomalyPicture.idParent = picture.idParent;
                anomalyPicture.dataUri = picture.dataUri;
                anomalyPicture.sketchJson = picture.sketchJson;
                images.push({
                    picture: picture
                });
                this.formImageField.setValue(images);
                this.imageList.push(anomalyPicture);
            } else {
                images.push({
                    picture: picture
                });
                this.formImageField.setValue(images);
            }
        }
    }
}
