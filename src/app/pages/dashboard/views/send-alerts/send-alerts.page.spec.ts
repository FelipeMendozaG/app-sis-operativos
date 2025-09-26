import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAlertsPage } from './send-alerts.page';

describe('SendAlertsPage', () => {
  let component: SendAlertsPage;
  let fixture: ComponentFixture<SendAlertsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendAlertsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAlertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
