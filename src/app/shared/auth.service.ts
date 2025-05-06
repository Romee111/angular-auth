import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticated = false;

  login(data: { email: string; password: string }): Observable<any> {
    if (data.email === 'admin@demo.com' && data.password === '123456') {
      localStorage.setItem('token', 'fake-jwt-token');
      this.isAuthenticated = true;
      return of({ token: 'fake-jwt-token' }).pipe(delay(500));
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  signup(data: { email: string; password: string }): Observable<any> {
    return of({ message: 'Signup successful' }).pipe(delay(500));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}
