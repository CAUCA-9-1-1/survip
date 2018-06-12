import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHazardousMaterialComponent } from './manage-hazardous-material.component';

describe('ManageHazardousMaterialComponent', () => {
  let component: ManageHazardousMaterialComponent;
  let fixture: ComponentFixture<ManageHazardousMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHazardousMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHazardousMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
