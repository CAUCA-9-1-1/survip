import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectTemplateComponent} from './select-template.component';


describe('SlideshowComponent', () => {
  let component: SelectTemplateComponent;
  let fixture: ComponentFixture<SelectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
