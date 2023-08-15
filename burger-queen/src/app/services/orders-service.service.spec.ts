import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrdersServiceService } from './orders-service.service';

describe('OrdersServiceService', () => {
  let service: OrdersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(OrdersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
