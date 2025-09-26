import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPages } from './notifications.pages';

describe('NotificationsPages', () => {
  let component: NotificationsPages;
  let fixture: ComponentFixture<NotificationsPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
