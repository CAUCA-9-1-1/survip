import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionBuildingComponent } from './intervention-building.component';

describe('InterventionBuildingComponent', () => {
  let component: InterventionBuildingComponent;
  let fixture: ComponentFixture<InterventionBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
