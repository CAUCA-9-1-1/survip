import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {ManagePnapsComponent} from './manage-pnaps.component';


describe('ManagePnapsComponent', () => {
    let component: ManagePnapsComponent;
    let fixture: ComponentFixture<ManagePnapsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ManagePnapsComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagePnapsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
