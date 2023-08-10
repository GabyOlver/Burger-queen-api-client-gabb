import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/userInterfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url:string = 'https://burger-queen-api-mock-production-7cd5.up.railway.app';

  constructor(private http: HttpClient, private router: Router) { }

  logIn(body: UserCredentials):Observable<any> {
    const loginURL = this.url + '/login'
    return this.http.post(loginURL, body)
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-rol');
    localStorage.removeItem('user-name');

    this.router.navigate(['/login']);
  }
}