import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevextremeComponent } from './devextreme.component';

describe('DevextremeComponent', () => {
  let component: DevextremeComponent;
  let fixture: ComponentFixture<DevextremeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevextremeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevextremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
