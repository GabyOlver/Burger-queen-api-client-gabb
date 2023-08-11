import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoginComponent } from './login.component';
import { AuthServiceService } from '../services/auth-service.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceService;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to waiter route if login is successful', fakeAsync(() => {
    const authServiceSpy = spyOn(authService, 'logIn').and.returnValue(
      of({
        accessToken: 'fakeToken',
        user: {
          role: 'waiter', id: 1, email: 'test@example.com', name: 'Test User'
        }
      })
    );

    const routerSpy = spyOn(router, 'navigate');

    component.formWaiter.patchValue({
      email: 'test@example.com',
      password: '123456',
    });

    component.ingresar();
    tick();

    expect(authServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/waiter']);

  }));

  it('should show error alert if login fails', fakeAsync(() => {
    const authServiceSpy = spyOn(authService, 'logIn').and.returnValue(
      throwError(new Error('Login failed'))
    );

    const swalSpy = spyOn(Swal, 'fire');

    component.formWaiter.patchValue({
      email: 'test@example.com',
      password: 'invalidpassword',
    });

    component.ingresar();
    tick();

    expect(authServiceSpy).toHaveBeenCalled();
    expect(swalSpy).toHaveBeenCalled();

    // Additional assertions related to error Swal.fire can be added here
  }));
});
