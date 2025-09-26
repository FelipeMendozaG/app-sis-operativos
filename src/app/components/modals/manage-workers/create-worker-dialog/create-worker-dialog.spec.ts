import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkerDialog } from './create-worker-dialog';

describe('CreateWorkerDialog', () => {
  let component: CreateWorkerDialog;
  let fixture: ComponentFixture<CreateWorkerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorkerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
