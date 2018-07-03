import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module.spec';
import {ManagementAccessComponent} from './management-access.component';
import {PermissionComponent} from './permission/permission.component';
import {WebuserComponent} from './webuser/webuser.component';
import {ApisactionComponent} from './apisaction/apisaction.component';
import {FireSafetyDepartmentComponent} from './firesafetydepartment/firesafetydepartment.component';
import {FirestationComponent} from './firestation/firestation.component';


describe('ManagementAccessComponent', () => {
    let component: ManagementAccessComponent;
    let fixture: ComponentFixture<ManagementAccessComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                ManagementAccessComponent,
                ApisactionComponent,
                FireSafetyDepartmentComponent,
                FirestationComponent,
                PermissionComponent,
                WebuserComponent,
            ],
            providers: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagementAccessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
