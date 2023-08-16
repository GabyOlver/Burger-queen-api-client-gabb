import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[HttpClientTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cuando se ingrese solo un dato el form debe ser invalido', () => {
    const email = component.formWaiter.controls['email']
    email.setValue('test@test.com')

    expect(component.formWaiter.invalid).toBeTrue();
  });

  it('Cuando se ingresen todos los campos el form debe ser valido', () => {
    const email = component.formWaiter.controls['email'];
    const password = component.formWaiter.controls['password'];

    email.setValue('test@test.com');
    password.setValue('123456');

    expect(component.formWaiter.invalid).toBeFalse();
  });
});