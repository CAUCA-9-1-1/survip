import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBuildingComponent } from './management-building.component';

describe('ManagementBuildingComponent', () => {
  let component: ManagementBuildingComponent;
  let fixture: ComponentFixture<ManagementBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
