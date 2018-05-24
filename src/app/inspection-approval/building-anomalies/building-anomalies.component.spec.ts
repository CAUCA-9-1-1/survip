import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAnomaliesComponent } from './building-anomalies.component';

describe('BuildingAnomaliesComponent', () => {
  let component: BuildingAnomaliesComponent;
  let fixture: ComponentFixture<BuildingAnomaliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingAnomaliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAnomaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
