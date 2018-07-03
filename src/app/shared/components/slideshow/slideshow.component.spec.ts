import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {SlideshowComponent} from './slideshow.component';


describe('SlideshowComponent', () => {
    let component: SlideshowComponent;
    let fixture: ComponentFixture<SlideshowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SlideshowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
