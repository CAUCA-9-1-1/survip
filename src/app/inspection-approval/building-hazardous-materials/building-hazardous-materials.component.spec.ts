import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingHazardousMaterialsComponent } from './building-hazardous-materials.component';

describe('BuildingHazardousMaterialsComponent', () => {
  let component: BuildingHazardousMaterialsComponent;
  let fixture: ComponentFixture<BuildingHazardousMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingHazardousMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingHazardousMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
