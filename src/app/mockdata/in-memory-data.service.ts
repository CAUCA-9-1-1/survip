import { InMemoryDbService } from 'angular-in-memory-web-api';

import { PreventionSurveyData } from './prevention-survey-data';
import { LaneData } from './lane-data';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const surveys = [
    {
      'createdOn': '2017/03/21 11:39:03',
      'name': '',
      'idLanguageContentName': '8e22388f-b82e-4ea9-a8e2-f57f5a86d5cc',
      'idSurvey': '2ad92470-c65b-498b-a2c7-792dda7f139b',
      'isActive': true,
      'surveyType': 'residential',
      'idBuilding' : ''
    },
    {
      'createdOn': '2017/03/21 11:39:03',
      'name': '',
      'idLanguageContentName': '8e22388f-b82e-4ea9-a8e2-f57f5a86d5cc',
      'idSurvey': '2ad92470-c65b-498b-a2c7-792dda7f139b',
      'isActive': true,
      'surveyType': 'residential',
      'idBuilding' : ''
      },
    {
      'createdOn': '2017/03/21 11:39:03',
      'name': '',
      'idLanguageContentName': '8e22388f-b82e-4ea9-a8e2-f57f5a86d5cc',
      'idSurvey': '2ad92470-c65b-498b-a2c7-792dda7f139b',
      'isActive': true,
      'surveyType': 'residential',
      'idBuilding' : ''
      }
    ];

    const preventionSurvey = new PreventionSurveyData().data;
    const lane = new LaneData().data;

    return {
      'surveys': surveys,
      'lanes': lane,
      'prevention-survey': preventionSurvey
    };
  }
}
