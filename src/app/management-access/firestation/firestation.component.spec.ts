import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {FirestationComponent} from './firestation.component';


describe('FirestationComponent', () => {
    let component: FirestationComponent;
    let fixture: ComponentFixture<FirestationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [FirestationComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FirestationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
