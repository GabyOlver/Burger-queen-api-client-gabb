import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditWorkersComponent } from './edit-workers.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditWorkersComponent', () => {
  let component: EditWorkersComponent;
  let fixture: ComponentFixture<EditWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkersComponent],
      imports:[HttpClientTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(EditWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
