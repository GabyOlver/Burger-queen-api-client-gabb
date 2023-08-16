import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StandbyOrdersComponent } from './standby-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('StandbyOrdersComponent', () => {
  let component: StandbyOrdersComponent;
  let fixture: ComponentFixture<StandbyOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandbyOrdersComponent],
      imports:[HttpClientTestingModule, SharedModule],
    });
    fixture = TestBed.createComponent(StandbyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
