import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestModule } from '../../../test.module';
import { ToolbarBackComponent } from './toolbar-back.component';

describe('ToolbarBackComponent', () => {
  let component: ToolbarBackComponent;
  let fixture: ComponentFixture<ToolbarBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule, RouterTestingModule ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
