import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-anomalies',
    templateUrl: './anomalies.component.html',
    styleUrls: ['./anomalies.component.scss']
})
export class AnomaliesComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
    }

    private idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
