import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { BuildingDetailComponent } from './building-detail.component';
import { SharedModule } from '../../shared/shared.module';

describe('BuildingDetailComponent', () => {
  let component: BuildingDetailComponent;
  let fixture: ComponentFixture<BuildingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ BuildingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
