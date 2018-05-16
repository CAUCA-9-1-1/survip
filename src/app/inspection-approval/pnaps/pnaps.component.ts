import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-pnaps',
    templateUrl: './pnaps.component.html',
    styleUrls: ['./pnaps.component.scss']
})
export class PnapsComponent implements OnInit {
    @Input() idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
