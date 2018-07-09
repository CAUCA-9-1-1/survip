import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
    @ViewChild('container') container: ElementRef;

    @Input() height: number;
    @Input() autoPlay: boolean;
    @Input('images')
    set images(list: string[]) {
        this.items = list;
        this.restart();
    }

    get images(): string[] {
        return this.items;
    }

    private timer: number;
    private items: string[] = [];
    private states: string[] = [];
    private selectedIndex = 0;

    constructor() { }

    ngOnInit() {
        this.container.nativeElement.style.height = this.height + 'px';
        this.container.nativeElement.style.width = '100%';
    }

    getState(index: number) {
        if (this.states[index]) {
            return this.states[index];
        }

        return (this.selectedIndex === index ? 'in' : 'out');
    }

    restart() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }

        if (this.images && this.images.length) {
            this.timer = window.setInterval(() => this.changed('next'), 5000);
        }
    }

    next() {
        if (this.selectedIndex < this.items.length - 1) {
            this.selectedIndex++;
        } else {
            this.selectedIndex = 0;
        }
    }

    private changed(action: string) {
        this.states[this.selectedIndex] = 'out';

        this[action]();

        this.states[this.selectedIndex] = 'in';
    }
}
