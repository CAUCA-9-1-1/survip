import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {UtilisationCodeComponent} from './utilisation-code.component';


describe('UtilisationCodeComponent', () => {
    let component: UtilisationCodeComponent;
    let fixture: ComponentFixture<UtilisationCodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [UtilisationCodeComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UtilisationCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
