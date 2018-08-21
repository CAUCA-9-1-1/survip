import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {TestModule} from '../../test.module.spec';
import {AskNewThemeComponent} from './ask-new-theme.component';


describe('AskNewThemeComponent', () => {
    let component: AskNewThemeComponent;
    let fixture: ComponentFixture<AskNewThemeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [AskNewThemeComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AskNewThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
