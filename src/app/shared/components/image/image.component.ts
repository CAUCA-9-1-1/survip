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
    @Input() height = '150px';
    @Input() allowChange = false;
    @Input() autoApiChange = false;
    @Input()
    set idImage(id) {
        this.src = '';
        this.icon = 'plus';
        this.idPicture = id;

        if (id) {
            this.icon = 'edit';
            this.pictureService.getOne(id).subscribe(data => {
                this.src = data.dataUri;
            });
        }
    }

    public idPicture: string;
    public src: string;
    public icon = 'plus';

    public constructor(
        private pictureService: PictureService,
    ) { }

    public ngOnInit() {
        this.container.nativeElement.style.height = this.height;
    }

    public uploadPicture(e) {
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
