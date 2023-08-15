import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersServiceService } from './users-service.service';

describe('UsersServiceService', () => {
  let service: UsersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
    });
    service = TestBed.inject(UsersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
