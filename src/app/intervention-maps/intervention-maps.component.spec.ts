import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionMapsComponent } from './intervention-maps.component';

describe('IntervetionMapsComponent', () => {
  let component: InterventionMapsComponent;
  let fixture: ComponentFixture<InterventionMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
