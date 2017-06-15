import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import { MultilangComponent } from './multilang.component';

describe('MultilangComponent', () => {
  let component: MultilangComponent;
  let fixture: ComponentFixture<MultilangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ /*MultilangComponent*/ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
