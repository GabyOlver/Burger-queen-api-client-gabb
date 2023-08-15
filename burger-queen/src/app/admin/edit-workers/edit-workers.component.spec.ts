import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EditWorkersComponent } from './edit-workers.component';

describe('EditWorkersComponent', () => {
  let component: EditWorkersComponent;
  let fixture: ComponentFixture<EditWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkersComponent],
      imports:[HttpClientModule],
    });
    fixture = TestBed.createComponent(EditWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
