import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersServiceService } from './users-service.service';

describe('UsersServiceService', () => {
  let service: UsersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(UsersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
