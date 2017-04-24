import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingInformationComponent } from './building-information.component';

describe('BuildingInformationComponent', () => {
  let component: BuildingInformationComponent;
  let fixture: ComponentFixture<BuildingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
