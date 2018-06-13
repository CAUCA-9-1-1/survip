import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {PersonRequiringAssistanceType} from '../shared/models/person-requiring-assistance-type.model';
import {PersonRequiringAssistanceTypeService} from '../shared/services/person-requiring-assistance-type.service';


@Component({
    selector: 'app-managementbuilding-personrequiringassistancetype',
    templateUrl: './person-requiring-assistance-type.component.html',
    styleUrls: ['./person-requiring-assistance-type.component.scss'],
    providers: [
        PersonRequiringAssistanceTypeService,
    ]
})
export class PersonRequiringAssistanceTypeComponent extends GridWithCrudService implements OnInit {

    constructor(
        personRequiringAssistanceTypeService: PersonRequiringAssistanceTypeService
    ) {
        super(personRequiringAssistanceTypeService);
    }

    setModel(data: any) {
        return PersonRequiringAssistanceType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = PersonRequiringAssistanceType.fromJSON(data);

        return type.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
