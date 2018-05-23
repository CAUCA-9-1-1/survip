import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
    @ViewChild('container') container: ElementRef;

    @Input() height: number;
    @Input() autoPlay: boolean;
    @Input() images: string[];

    constructor() { }

    ngOnInit() {
        this.container.nativeElement.style.height = this.height + 'px';
        this.container.nativeElement.style.width = '100%';
        this.start();
    }

    start() {
        console.log(this.container.nativeElement);
    }
}
