import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthServiceService } from './auth-service.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthServiceService(httpClientSpy as any);
    // TestBed.configureTestingModule({
    //   imports:[HttpClientTestingModule],
    // });
    // service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar un objeto de datos al ingresar correctamente', (done: DoneFn) => {
    const mockCredentials = {
      email: 'meserito@gmail.com',
      password: '123456'
    }

    const mockResultLogin = {
      'data': {
        'user-id': 1,
        'user-rol': 'waiter',
        'user-email': 'meserito@gmail.com',
        'user-name': 'Emi',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…IzIn0.vuYafZSfhhZaa_74iT-XZ7sZ5Kj9xZSHgaZAVapItGI'
      }
    }

    httpClientSpy.post.and.returnValue(of(mockResultLogin));

    const body = mockCredentials
    service.logIn(body).subscribe(resultado => {
      expect(resultado).toEqual(mockResultLogin)
      done()
    });
  });

  it('Deberia retornar un error 400', (done: DoneFn) => {
    const mockCredentials = {
      email: 'tobi@gmail.com',
      password: ''
    }

    const error400 = new HttpErrorResponse({
      error: 'Cannot find user',
      status: 400, statusText: 'OK'
    })

    httpClientSpy.post.and.returnValue(throwError(error400));

    const body = mockCredentials
    service.logIn(body).subscribe((res) => {

    },
    (error) => {
      expect(error.status).toEqual(400);
      done()
    }
    )
  })
});
