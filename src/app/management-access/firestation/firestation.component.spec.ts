import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestationComponent } from './firestation.component';

describe('FirestationComponent', () => {
  let component: FirestationComponent;
  let fixture: ComponentFixture<FirestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
