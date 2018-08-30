import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {DepartmentRiskLevelComponent} from './department-risk-level.component';


describe('DepartmentRiskLevelComponent', () => {
    let component: DepartmentRiskLevelComponent;
    let fixture: ComponentFixture<DepartmentRiskLevelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [DepartmentRiskLevelComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DepartmentRiskLevelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
