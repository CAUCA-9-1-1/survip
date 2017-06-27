import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementFireHydrantComponent } from './management-fire-hydrant.component';

describe('ManagementFireHydrantComponent', () => {
  let component: ManagementFireHydrantComponent;
  let fixture: ComponentFixture<ManagementFireHydrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementFireHydrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementFireHydrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
