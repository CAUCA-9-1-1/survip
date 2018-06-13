import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
    @Input() height: string;
    @Input() allowChange: boolean;
    @Input()
    set idImage(id) {
        this.src = '';

        if (id) {
            this.pictureService.get(id).subscribe(data => {
                this.src = 'data:image/jpeg;base64,' + data['picture'];
            });
        }
    }

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

        picture.data = e.content;
        picture.name = e.name;

        this.pictureService.save(picture).subscribe(data => {
            console.log(data);
        });
    }
}
