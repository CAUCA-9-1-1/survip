import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { DxTabPanelModule, DxTextBoxModule } from 'devextreme-angular';

import { CauseSharedModule } from '../../shared/module';
import { MultilangComponent } from './multilang.component';
import { ConfigService } from '../../core/config/config.service';

describe('MultilangComponent', () => {
  let component: MultilangComponent;
  let fixture: ComponentFixture<MultilangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultilangComponent,
      ],
      imports: [
        DxTabPanelModule,
        DxTextBoxModule,
        HttpModule,

        CauseSharedModule,
      ],
      providers: [
        ConfigService,
      ]
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
