import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Track login state (true = logged in, false = logged out)
  private authSub = new BehaviorSubject<boolean>(this.hasToken());
  authState$ = this.authSub.asObservable();

  constructor() {}

  /** Check if a token exists in sessionStorage */
  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!sessionStorage.getItem('token');
  }

  /** Store token + optional user details in sessionStorage */
  login(token: string, user?: any) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('token', token);
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    }
    this.authSub.next(true); // notify that user is logged in
  }

  /** Clear sessionStorage and notify observers */
  logout() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
    this.authSub.next(false); // notify that user is logged out
  }

  /** Get the user object (parsed from sessionStorage) */
  getUser(): any | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userStr = sessionStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          sessionStorage.removeItem('user'); // clear invalid JSON
        }
      }
    }
    return null;
  }

  /** Return current auth state (true if logged in) */
  isAuthenticated(): boolean {
    return this.authSub.value;
  }
}

