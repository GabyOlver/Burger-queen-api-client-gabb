import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListOrdersComponent } from './list-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ListOrdersComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrdersComponent],
      imports:[HttpClientTestingModule, SharedModule],
    });
    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
