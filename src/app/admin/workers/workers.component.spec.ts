import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkersComponent } from './workers.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('WorkersComponent', () => {
  let component: WorkersComponent;
  let fixture: ComponentFixture<WorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkersComponent],
      imports:[HttpClientTestingModule, SharedModule],
    });
    fixture = TestBed.createComponent(WorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
