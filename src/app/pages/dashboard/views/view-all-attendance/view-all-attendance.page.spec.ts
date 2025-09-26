import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAttendancePage } from './view-all-attendance.page';

describe('ViewAllAttendancePage', () => {
  let component: ViewAllAttendancePage;
  let fixture: ComponentFixture<ViewAllAttendancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAttendancePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
