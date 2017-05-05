import { Injectable } from '@angular/core';

@Injectable()
export class InspectionQuestionService {
  private answers: object[];

  constructor() { }

  answer(idSurveyQuestion: string, answer: any) {
    this.answers.push({
      idSurveyQuestion: answer
    });
  }
}
