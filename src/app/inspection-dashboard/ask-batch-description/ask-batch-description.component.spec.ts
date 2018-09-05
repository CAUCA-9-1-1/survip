import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {TestModule} from '../../test.module.spec';
import {AskBatchDescriptionComponent} from './ask-batch-description.component';


describe('AskRemoveItemComponent', () => {
    let component: AskBatchDescriptionComponent;
    let fixture: ComponentFixture<AskBatchDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [AskBatchDescriptionComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AskBatchDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
