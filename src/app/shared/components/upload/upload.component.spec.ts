import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {UploadComponent} from './upload.component';


describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
