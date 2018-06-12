import {Component, Input, OnInit} from '@angular/core';
import {PictureService} from '../../services/picture.service';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    providers: [
        PictureService,
    ]
})
export class ImageComponent implements OnInit {
    @Input() height: string;
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
    }

}
