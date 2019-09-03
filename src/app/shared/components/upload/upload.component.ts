import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    @ViewChild('file', {static: false}) file: ElementRef;
    @Output() readend = new EventEmitter();
    @Input() accept: string;
    @Input() multiple = false;
    @Input() icon = 'plus';

    public constructor() { }

    public ngOnInit() { }

    public onSelectFile(e) {
        for (let i = 0, j = e.target.files.length; i < j; i++) {
            const file = e.target.files[i];
            const reader = new FileReader();

            reader.onload = this.onReadEnd.bind(this, file);
            reader.readAsDataURL(file);
        }
    }

    public openDialog(e) {
        if (this.file) {
            this.file.nativeElement.click();
        }

        e.event.stopPropagation();
    }

    private onReadEnd(file, e) {
        this.readend.emit({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModifiedDate: file.lastModifiedDate,
            content: e.target['result'],
        });
    }
}
