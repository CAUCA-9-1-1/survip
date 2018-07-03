import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {ImageComponent} from './image.component';


describe('ImageComponent', () => {
    let component: ImageComponent;
    let fixture: ComponentFixture<ImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
