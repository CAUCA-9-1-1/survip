import { Injectable } from '@angular/core';
import ODataStore from 'devextreme/data/odata/store';

import {environment} from '../../../environments/environment';
import {ODataConfig} from '../models/o-data-config.model';


@Injectable()
export class ODataService {

    constructor(config: ODataConfig) {
        return new ODataStore({
            beforeSend: request => {
                request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('currentToken');
                request.headers['languageCode'] = environment.locale.use;
            },
            url: environment.apiUrl + config.url,
            key: config.key,
            keyType: config.keyType,
            version: 4,
        });
    }

}
