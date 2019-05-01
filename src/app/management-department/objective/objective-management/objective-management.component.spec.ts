import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveManagementComponent } from './objective-management.component';

describe('ObjectiveManagementComponent', () => {
  let component: ObjectiveManagementComponent;
  let fixture: ComponentFixture<ObjectiveManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
