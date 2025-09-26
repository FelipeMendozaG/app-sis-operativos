import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkerDialog } from './update-worker-dialog';

describe('UpdateWorkerDialog', () => {
  let component: UpdateWorkerDialog;
  let fixture: ComponentFixture<UpdateWorkerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWorkerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWorkerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
