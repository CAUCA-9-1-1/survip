import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-pnaps',
    templateUrl: './pnaps.component.html',
    styleUrls: ['./pnaps.component.scss']
})
export class PnapsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
    }

    private idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
