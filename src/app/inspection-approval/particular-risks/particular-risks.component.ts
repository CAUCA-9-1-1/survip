import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-particular-risks',
    templateUrl: './particular-risks.component.html',
    styleUrls: ['./particular-risks.component.scss']
})
export class ParticularRisksComponent implements OnInit {
    @Input() idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
