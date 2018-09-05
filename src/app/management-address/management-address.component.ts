import {Component, OnInit} from '@angular/core';

import {AuthGuardService} from '../shared/services/auth-guard.service';


@Component({
    selector: 'app-management-address',
    templateUrl: './management-address.component.html',
    styleUrls: ['./management-address.component.scss']
})
export class ManagementAddressComponent implements OnInit {
    public accessTo = {
        city: false,
        country: false,
        county: false,
        region: false,
        state: false,
    };

    public constructor(
        private authGuardService: AuthGuardService,
    ) { }

    public ngOnInit() {
        this.accessTo.city = this.authGuardService.hasRight('RightCityManagement');
        this.accessTo.country = this.authGuardService.hasRight('RightCountryManagement');
        this.accessTo.county = this.authGuardService.hasRight('RightCountyManagement');
        this.accessTo.region = this.authGuardService.hasRight('RightRegionManagement');
        this.accessTo.state = this.authGuardService.hasRight('RightStateManagement');
    }
}
