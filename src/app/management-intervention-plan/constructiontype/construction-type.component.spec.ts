import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {ConstructionTypeComponent} from './construction-type.component';

describe('ConstructionTypeComponent', () => {
  let component: ConstructionTypeComponent;
  let fixture: ComponentFixture<ConstructionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ ConstructionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
