import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {Picture} from '../../models/picture.model';
import {InspectionPictureService} from '../../../inspection-approval/shared/services/inspection-picture.service';
import { v4 as uuid } from 'uuid';

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

    private canvas = null;

    public constructor(
        private pictureService: PictureService,
        private inspectionPictureService: InspectionPictureService,
    ) { }

    public ngOnInit() {
        this.container.nativeElement.style.height = this.height;
    }

    public uploadPicture(e) {
        const picture = new Picture();
        picture.id = this.idPicture ? this.idPicture : uuid();
        picture.name = e.name;
        picture.mimeType = '';
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

        this.picture.dataUri = this.canvas.toDataURL();
        this.src = this.picture.dataUri;
        this.picture.sketchJson = JSON.stringify(this.canvas.toJSON(['width', 'height']));
        const fullQualityCanvas = this.getFullSizeImage(JSON.parse(this.picture.sketchJson));
        this.picture.dataUri = fullQualityCanvas.toDataURL();
        this.src = this.picture.dataUri;

        this.valueChanged.emit(this.picture);
      }
    }
    private getFullSizeImage(json: JSON){
        let fullSizeCanvas = this.canvas = new fabric.Canvas('1');
        fullSizeCanvas = this.canvas.loadFromJSON(json, this.canvas.renderAll.bind(this.canvas));
        fullSizeCanvas.renderAll();
        return fullSizeCanvas;
    }
