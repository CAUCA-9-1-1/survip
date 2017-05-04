import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SurveyQuestionData } from './survey-question-data';
import { InspectionQuestionData } from './inspection-question-data';
import { LaneData } from './lane-data';
import { BuildingContactData } from './building-contact-data';

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

    const surveyQuestions = new SurveyQuestionData().data;
    const inspectionQuestion = new InspectionQuestionData().data;
    const lanes = new LaneData().data;
    const buildingContacts =  new BuildingContactData().data;

    return {
      'surveys': surveys,
      'lanes': lanes,
      'survey-question': surveyQuestions,
      'inspection-question': inspectionQuestion,
      'building-contacts': buildingContacts
    };
  }
}
