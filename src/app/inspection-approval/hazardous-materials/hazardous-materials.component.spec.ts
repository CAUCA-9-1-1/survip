import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardousMaterialsComponent } from './hazardous-materials.component';

describe('HazardousMaterialsComponent', () => {
  let component: HazardousMaterialsComponent;
  let fixture: ComponentFixture<HazardousMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardousMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardousMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
