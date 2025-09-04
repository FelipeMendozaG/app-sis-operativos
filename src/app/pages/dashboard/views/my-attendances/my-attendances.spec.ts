import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAttendances } from './my-attendances';

describe('MyAttendances', () => {
  let component: MyAttendances;
  let fixture: ComponentFixture<MyAttendances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAttendances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAttendances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
