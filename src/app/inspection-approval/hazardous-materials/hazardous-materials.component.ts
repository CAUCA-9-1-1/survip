import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hazardous-materials',
    templateUrl: './hazardous-materials.component.html',
    styleUrls: ['./hazardous-materials.component.scss']
})
export class HazardousMaterialsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
    }

    private idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
