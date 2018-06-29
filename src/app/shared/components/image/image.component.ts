import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {Picture} from '../../models/picture.model';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    providers: [
        PictureService,
    ]
})
export class ImageComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    @Output() valueChanged = new EventEmitter();
    @Input() height: string;
    @Input() allowChange = false;
    @Input() autoApiChange = false;
    @Input()
    set idImage(id) {
        this.src = '';
        this.idPicture = id;

        if (id) {
            this.pictureService.get(id).subscribe(data => {
                this.src = data.dataUri;
            });
        }
    }

    idPicture: string;
    src: string;

    constructor(
        private pictureService: PictureService,
    ) {
        this.height = '150px';
    }

    ngOnInit() {
        this.container.nativeElement.style.height = this.height;
    }

    uploadPicture(e) {
        const picture = new Picture();

        picture.id = this.idPicture || undefined;
        picture.name = e.name;
        picture.data = '';
        picture.mimeType = '';
        picture.dataUri = e.content;

        this.src = e.content;

        if (this.autoApiChange) {
            this.pictureService.save(picture).subscribe(id => {
                this.valueChanged.emit({
                    value: id,
                    oldValue: this.idPicture,
                });

                this.idPicture = id;
            });
        } else {
            this.valueChanged.emit(picture);
        }
    }
}
