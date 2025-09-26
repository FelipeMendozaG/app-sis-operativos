import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportsPage } from './generate-reports.page';

describe('GenerateReportsPage', () => {
  let component: GenerateReportsPage;
  let fixture: ComponentFixture<GenerateReportsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateReportsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
