import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPnapsComponent } from './building-pnaps.component';

describe('BuildingPnapsComponent', () => {
  let component: BuildingPnapsComponent;
  let fixture: ComponentFixture<BuildingPnapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingPnapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPnapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
