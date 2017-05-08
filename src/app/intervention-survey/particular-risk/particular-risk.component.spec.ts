import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { ParticularRiskComponent } from './particular-risk.component';

describe('ParticularRiskComponent', () => {
  let component: ParticularRiskComponent;
  let fixture: ComponentFixture<ParticularRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ ParticularRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
