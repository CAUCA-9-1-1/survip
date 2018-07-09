import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TestModule} from '../test.module.spec';
import {ManagementSurveyComponent} from './management-survey.component';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';


describe('ManagementSurveyComponent', () => {
    let component: ManagementSurveyComponent;
    let fixture: ComponentFixture<ManagementSurveyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                ManagementSurveyComponent,
                ListComponent,
                QuestionComponent
            ],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    queryParams: Observable.of({})
                }
            }]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagementSurveyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
