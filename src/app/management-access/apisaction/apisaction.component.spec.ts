import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisactionComponent } from './apisaction.component';

describe('ApisactionComponent', () => {
  let component: ApisactionComponent;
  let fixture: ComponentFixture<ApisactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApisactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
