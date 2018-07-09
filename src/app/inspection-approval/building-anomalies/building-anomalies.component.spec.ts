import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {BuildingAnomaliesComponent} from './building-anomalies.component';


describe('BuildingAnomaliesComponent', () => {
    let component: BuildingAnomaliesComponent;
    let fixture: ComponentFixture<BuildingAnomaliesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [BuildingAnomaliesComponent],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuildingAnomaliesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
