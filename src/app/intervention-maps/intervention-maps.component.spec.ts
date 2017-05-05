import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InterventionMapsComponent } from './intervention-maps.component';
import { SharedModule } from '../shared/shared.module';

describe('IntervetionMapsComponent', () => {
  let component: InterventionMapsComponent;
  let fixture: ComponentFixture<InterventionMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule ],
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
