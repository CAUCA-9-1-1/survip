import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TestModule} from '../../test.module.spec';
import {LoginComponent} from './login.component';
import {AuthenticationService} from '../shared/services/authentification.service';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [LoginComponent],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    snapshot: { queryParams: Observable.of({}) }
                }
            }, AuthenticationService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
