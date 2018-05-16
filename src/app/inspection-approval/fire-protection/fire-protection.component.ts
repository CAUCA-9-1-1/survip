import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-fire-protection',
    templateUrl: './fire-protection.component.html',
    styleUrls: ['./fire-protection.component.scss']
})
export class FireProtectionComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
    }

    private idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
