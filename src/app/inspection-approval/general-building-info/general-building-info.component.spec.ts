import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBuildingInfoComponent } from './general-building-info.component';

describe('GeneralBuildingInfoComponent', () => {
  let component: GeneralBuildingInfoComponent;
  let fixture: ComponentFixture<GeneralBuildingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralBuildingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBuildingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
