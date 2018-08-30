import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TestModule} from '../test.module.spec';
import {ManagementSystemComponent} from './management-system.component';
import {ListComponent} from './list/list.component';
import {QuestionComponent} from './question/question.component';


describe('ManagementSystemComponent', () => {
    let component: ManagementSystemComponent;
    let fixture: ComponentFixture<ManagementSystemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                ManagementSystemComponent,
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
        fixture = TestBed.createComponent(ManagementSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
