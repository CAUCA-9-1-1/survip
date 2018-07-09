import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TestModule} from '../test.module.spec';
import {InspectionBatchComponent} from './inspection-batch.component';


describe('InspectionBatchComponent', () => {
    let component: InspectionBatchComponent;
    let fixture: ComponentFixture<InspectionBatchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InspectionBatchComponent],
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
        fixture = TestBed.createComponent(InspectionBatchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
