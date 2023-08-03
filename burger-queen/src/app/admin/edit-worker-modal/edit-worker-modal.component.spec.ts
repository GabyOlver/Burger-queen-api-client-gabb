import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkerModalComponent } from './edit-worker-modal.component';

describe('EditWorkerModalComponent', () => {
  let component: EditWorkerModalComponent;
  let fixture: ComponentFixture<EditWorkerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkerModalComponent]
    });
    fixture = TestBed.createComponent(EditWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
