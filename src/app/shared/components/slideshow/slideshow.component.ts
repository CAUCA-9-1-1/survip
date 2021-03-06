import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {v4 as uuid} from 'uuid';
import {Picture} from '../../models/picture.model';
import {DxDataGridComponent} from 'devextreme-angular';


@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
    animations: [
        trigger('slideUpDown', [
            state('in', style({transform: 'translateY(0%)'})),
            state('out', style({transform: 'translateY(-100%)'})),
            transition('in => out', [
                animate('500ms ease-in')
            ]),
            transition('out => in', [
                style({transform: 'translateY(100%)'}),
                animate('500ms ease-in')
            ]),
        ]),
        trigger('slideLeftRight', [
            state('in', style({transform: 'translateX(0%)'})),
            state('out', style({transform: 'translateX(-100%)'})),
            transition('in => out', [
                animate('500ms ease-in')
            ]),
            transition('out => in', [
                style({transform: 'translateX(100%)'}),
                animate('500ms ease-in')
            ]),
        ]),
    ],
})
export class SlideshowComponent implements OnInit {
    @ViewChild('container', {static: false}) container: ElementRef;
    @Output() valueChanged = new EventEmitter();
    @Input() height = '150px';
    @Input() autoPlay = true;
    @Input() allowChange = false;
    @Input() useDataCopy = false;
    @Input('images')
    set images(list: string[]) {
        this.items = list;
        if (!this.timer) {
            this.restart();
        }
    }

    get images(): string[] {
        return this.items;
    }

    private timer: number;
    private items: string[] = [];
    private states: string[] = [];
    private selectedIndex = 0;

    public constructor() {}

    public ngOnInit() {
        this.container.nativeElement.style.height = this.height;
        this.container.nativeElement.style.width = '100%';
    }

    public getState(index: number) {
        if (this.states[index]) {
            return this.states[index];
        }

        return (this.selectedIndex === index ? 'in' : 'out');
    }

    public isImage(url) {
        if ((typeof url !== 'object') && (url.indexOf('data:image') > -1 || url.indexOf('/') > -1)) {
            return true;
        }

        return false;
    }

    public restart() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }

        if (this.images && this.images.length) {
            this.timer = window.setInterval(() => this.changed('next'), 5000);
        }
    }

    public next() {
        if (this.selectedIndex < this.items.length - 1) {
            this.selectedIndex++;
        } else {
            this.selectedIndex = 0;
        }
    }

    public changePicture(e) {
        this.valueChanged.emit(e);
    }

    public addPicture(e) {
        const picture = new Picture();

        picture.id = undefined;
        picture.name = e.name;
        picture.dataUri = e.content;

        this.valueChanged.emit(picture);
    }

    private changed(action: string) {
        this.states[this.selectedIndex] = 'out';

        this[action]();

        this.states[this.selectedIndex] = 'in';
    }
}
