import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {BuildingParticularRisksComponent} from './building-particular-risks.component';


describe('BuildingParticularRisksComponent', () => {
    let component: BuildingParticularRisksComponent;
    let fixture: ComponentFixture<BuildingParticularRisksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
            ],
            declarations: [BuildingParticularRisksComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuildingParticularRisksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
