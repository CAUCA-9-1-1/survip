import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSprinklerComponent } from './water-sprinkler.component';

describe('WaterSprinklerComponent', () => {
  let component: WaterSprinklerComponent;
  let fixture: ComponentFixture<WaterSprinklerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterSprinklerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSprinklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
