import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module.spec';
import {ManagementDepartmentComponent} from './management-department.component';
import {PermissionComponent} from '../management-system/permission/permission.component';
import {WebuserComponent} from '../management-system/webuser/webuser.component';
import {ApisactionComponent} from './apisaction/apisaction.component';
import {DepartmentComponent} from '../management-system/department/department.component';
import {FirestationComponent} from './firestation/firestation.component';


describe('ManagementDepartmentComponent', () => {
    let component: ManagementDepartmentComponent;
    let fixture: ComponentFixture<ManagementDepartmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                ManagementDepartmentComponent,
                ApisactionComponent,
                DepartmentComponent,
                FirestationComponent,
                PermissionComponent,
                WebuserComponent,
            ],
            providers: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagementDepartmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
