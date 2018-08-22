import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {Picture} from '../../models/picture.model';
import {InspectionPictureService} from "../../../inspection-approval/shared/services/inspection-picture.service";

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
    set idImage(id) {
        this.src = '';
        this.icon = 'plus';
        this.idPicture = id;

        if (id) {
            this.icon = 'edit';
            if (this.useDataCopy) {
              this.inspectionPictureService.getOne(id).subscribe(data => {
                this.src = data.dataUri;
              });
            } else {
              this.pictureService.getOne(id).subscribe(data => {
                this.src = data.dataUri;
              });
            }
        }
    }

    public idPicture: string;
    public src: string;
    public icon = 'plus';

    public constructor(
        private pictureService: PictureService,
        private inspectionPictureService: InspectionPictureService
    ) { }

    public ngOnInit() {
        this.container.nativeElement.style.height = this.height;
    }

    public uploadPicture(e) {
        const picture = new Picture();

        picture.id = this.idPicture || undefined;
        picture.name = e.name;
        picture.mimeType = '';
        picture.dataUri = e.content;

        this.src = e.content;

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
}
