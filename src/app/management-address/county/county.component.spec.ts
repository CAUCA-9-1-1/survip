import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {CountyComponent} from './county.component';

describe('CountyComponent', () => {
  let component: CountyComponent;
  let fixture: ComponentFixture<CountyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ CountyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
