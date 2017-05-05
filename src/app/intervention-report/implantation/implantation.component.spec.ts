import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplantationComponent } from './implantation.component';

describe('ImplantationComponent', () => {
  let component: ImplantationComponent;
  let fixture: ComponentFixture<ImplantationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplantationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplantationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
