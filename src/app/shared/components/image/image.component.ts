import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {Picture} from '../../models/picture.model';
import {InspectionPictureService} from '../../../inspection-approval/shared/services/inspection-picture.service';
import {v4 as uuid} from 'uuid';
import {fabric} from 'fabric';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    providers: [
        PictureService,
        InspectionPictureService
    ]
})
export class ImageComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    @Output() valueChanged = new EventEmitter();
    @Input() height = '150px';
    @Input() allowChange = false;
    @Input() autoApiChange = false;
    @Input() useDataCopy = false;
    @Input()
    set idImage(img) {
        if (img) {
            if (typeof img === 'object' && (img.dataUri || img.data)) {
                this.src = '';
                this.idPicture = img.id;
                this.icon = 'image';
                this.src = img.dataUri ? img.dataUri : 'data:' + img.mimeType + ';base64,' + img.data;
                this.picture = img;
            } else {
                this.src = '';
                this.icon = 'plus';
                this.idPicture = img;
                if (img) {
                    this.icon = 'image';
                    if (this.useDataCopy) {
                        this.inspectionPictureService.getOne(img).subscribe(data => {
                            this.src = data.dataUri;
                            this.picture = data;
                        });
                    } else {
                        this.pictureService.getOne(img).subscribe(data => {
                            this.src = data.dataUri;
                            this.picture = data;
                        });
                    }
                }
            }
        }
    }

    public idPicture: string;
    public src: string;
    public sketchImage: string;
    public sketchJson: string;
    public sketchName: string;
    public picture: Picture;
    public icon = 'plus';
    public isPopupVisible = false;
    public pictogramsPath = "./assets/pictograms/";
    public pictograms =["AccesPrincipal.png", "Annonciateur.png", "BoiteClees.png", "BorneIncendie.png",
                        "CamionPompier.png", "GazNaturel.png", "GazPropane.png", "Generatrice.png"];

    private labels = {};
    private canvas = null;

    public constructor(
        private pictureService: PictureService,
        private inspectionPictureService: InspectionPictureService,
        private notification: MatSnackBar,
        private translateService: TranslateService,
    ) { }

    public ngOnInit() {
        this.container.nativeElement.style.height = this.height;
        this.translateService.get([
            'imageSizeWarning'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    public async uploadPicture(e) {
        const picSizeValid = await this.isPictureSizeValid(e.content);
        if (picSizeValid) {
            const picture = new Picture();
            picture.id = this.idPicture ? this.idPicture : uuid();
            picture.name = e.name;
            picture.dataUri = e.content;

            this.src = e.content;
            this.sketchName = e.name;
            this.picture = picture;

            if (this.autoApiChange) {
                if (this.useDataCopy) {
                    this.inspectionPictureService.save(picture).subscribe(id => {
                        this.emitValueChanged(id);
                    });
                } else {
                    this.pictureService.save(picture).subscribe(id => {
                        this.emitValueChanged(id);
                    });
                }
            } else {
                this.valueChanged.emit(picture);
            }
        } else {
            this.notification.open( this.labels['imageSizeWarning'], '', {
                duration: 5000,
                panelClass: ['error-toasts']
            });
        }
    }

  private emitValueChanged(id) {
    this.valueChanged.emit({
      value: id,
      oldValue: this.idPicture,
    });

    this.idPicture = id;
  }

    public editPicture() {
        this.isPopupVisible = true;
        this.sketchName = this.picture.name;
        this.sketchImage = this.src;
        this.sketchJson = this.picture.sketchJson;
    }

    public updateCanvas(event) {
      this.canvas = event;
    }

    public saveModifiedPicture() {
      if (this.canvas && this.picture) {
        const json = this.canvas.toJSON(['width', 'height']);
        this.picture.sketchJson = JSON.stringify(json);

        this.getFullSizeImage(json).then(() => {
            this.src = this.picture.dataUri;
            this.valueChanged.emit(this.picture);
        });
      }
    }

    private getFullSizeImage(json: JSON): Promise<void> {
        let fullSizeCanvas = new fabric.Canvas('1');
        return new Promise(
            (resolve): void => {
            fullSizeCanvas = fullSizeCanvas.loadFromJSON(json,
                () => {
                    fullSizeCanvas.renderAll.bind(fullSizeCanvas);
                fullSizeCanvas.renderAll();
                const backgroundImage = json['backgroundImage'];

                const scaleFactor = 1 / backgroundImage.scaleX;

                this.setFullSizeCanvasSize(fullSizeCanvas, json, scaleFactor);
                this.setFullSizeBackground(fullSizeCanvas, scaleFactor, backgroundImage);
                const objects = fullSizeCanvas.getObjects();
                this.setFullsizeObjects(objects, scaleFactor);

                fullSizeCanvas.renderAll();
                this.picture.dataUri = fullSizeCanvas.toDataURL({format: 'jpeg', quality: 0.9});
                resolve();
            }
          );
        });
    }

    private setFullSizeCanvasSize(fullSizeCanvas: fabric.Canvas, json: JSON, scaleFactor: number) {
        fullSizeCanvas.setWidth(json['width'] * scaleFactor);
        fullSizeCanvas.setHeight(json['height'] * scaleFactor);
    }

    private setFullSizeBackground(fullSizeCanvas: fabric.Canvas, scaleFactor: number, backgroundImage: fabric.Image) {
        const left = backgroundImage.left;
        const top = backgroundImage.top;

        fullSizeCanvas.setBackgroundImage(fullSizeCanvas.backgroundImage, fullSizeCanvas.renderAll.bind(fullSizeCanvas), {
            top: top * scaleFactor,
            left: left * scaleFactor,
            originX: 'left',
            originY: 'top',
            scaleX: 1,
            scaleY: 1
        });
    }

    private setFullsizeObjects(objects: Array<fabric.Object>, scaleFactor: number) {
        for (const obj of objects) {
            obj.left *= scaleFactor;
            obj.scaleX *= scaleFactor;
            obj.scaleY *= scaleFactor;
            obj.top *= scaleFactor;
            obj.setCoords();
        }
    }

    private async isPictureSizeValid(pic: string) {
        return this.pictureService.isPictureSizeValid(pic);
    }
}
