import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {Picture} from '../../models/picture.model';
import {InspectionPictureService} from '../../../inspection-approval/shared/services/inspection-picture.service';
import { v4 as uuid } from 'uuid';
import { fabric } from 'fabric';

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

        const json = this.canvas.toJSON(['width', 'height']);

        this.picture.sketchJson = JSON.stringify(json);
        this.getFullSizeImage(json).then(() => {
            //this.picture.dataUri = this.src;
            this.src = this.picture.dataUri;
    
            this.valueChanged.emit(this.picture);
        });
       
      }
    }

    private getFullSizeImage(json: JSON) : Promise<void> {
        let fullSizeCanvas = new fabric.Canvas('1');
        return new Promise(
            (resolve, reject): void => {
            fullSizeCanvas = fullSizeCanvas.loadFromJSON(json, 
                () => {
                    fullSizeCanvas.renderAll.bind(fullSizeCanvas);
                fullSizeCanvas.renderAll();
                const backgroundImage = json['backgroundImage'];

                //const container = this.divCanvasContainer;
            
                //const width = backgroundImage.width;
                //const height = backgroundImage.height;

                const width = json['width'];
                const height = json['height'];

                const previousScale = backgroundImage['scaleX'];
                let scaleFactor = 1 / backgroundImage.scaleX;

                fullSizeCanvas.setWidth(width * scaleFactor);
                fullSizeCanvas.setHeight(height * scaleFactor);

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
                //canvas.renderAll();
            
                const canvasWidth = backgroundImage.width;
                const canvasHeight = backgroundImage.height;
            
                const canvasAspect = canvasWidth / canvasHeight;
                const imgAspect = width / height;
                
        

                console.log(scaleFactor);
                
                const objectScale = scaleFactor / backgroundImage['scaleX'];
            
                //backgroundImage['scaleX'] *= scaleFactor;
                //backgroundImage['scaleY'] *= scaleFactor;
            

                //this.setCanvasSize(width * scaleFactor, height * scaleFactor);

            
                //const objects = json['objects'];
                const objects = fullSizeCanvas.getObjects();
            
                for (const obj of objects) {
                    obj.left *= scaleFactor;
                    obj.scaleX *= scaleFactor;
                    obj.scaleY *= scaleFactor;
                    obj.top *= scaleFactor;
                    obj.setCoords();
                }
            
                //fullSizeCanvas.selectable = true;
                //fullSizeCanvas.selection = true;
            
                fullSizeCanvas.renderAll();

                //fullSizeCanvas.toDataURL();
                this.picture.dataUri = fullSizeCanvas.toDataURL();
                resolve();
            }
          );
        })
    }
}
