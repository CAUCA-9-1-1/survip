import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {MainMenuComponent} from './main-menu.component';


describe('MainMenuComponent', () => {
    let component: MainMenuComponent;
    let fixture: ComponentFixture<MainMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
