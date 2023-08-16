import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogOutServiceService {

  constructor(private router: Router) { }

    logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-rol');
    localStorage.removeItem('user-name');

    this.router.navigate(['/login']);
  }
}
