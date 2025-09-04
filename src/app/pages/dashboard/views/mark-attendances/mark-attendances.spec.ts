import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAttendances } from './mark-attendances';

describe('MarkAttendances', () => {
  let component: MarkAttendances;
  let fixture: ComponentFixture<MarkAttendances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkAttendances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkAttendances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
