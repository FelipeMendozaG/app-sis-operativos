import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkersPage } from './manage-workers.page';

describe('ManageWorkersPage', () => {
  let component: ManageWorkersPage;
  let fixture: ComponentFixture<ManageWorkersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageWorkersPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
