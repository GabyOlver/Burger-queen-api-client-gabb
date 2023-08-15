import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsServiceService } from './products-service.service';

describe('ProductsServiceService', () => {
  let service: ProductsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
    });
    service = TestBed.inject(ProductsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
