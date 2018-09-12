import {Injectable} from '@angular/core';
import ODataStore from 'devextreme/data/odata/store';

import {ODataConfig} from '../models/o-data-config.model';
import config from '../../../assets/config/config.json';


@Injectable()
export class ODataService {

    public constructor(configOData: ODataConfig) {
        return new ODataStore({
            beforeSend: request => {
                request.headers['Authorization'] =
                    sessionStorage.getItem('authorizationType') + ' ' + sessionStorage.getItem('accessToken');
                request.headers['Language-Code'] = config.locale;
            },
            url: config.apiUrl + 'odata/' + configOData.url,
            key: configOData.key,
            keyType: configOData.keyType,
            version: 4,
        });
    }
}
