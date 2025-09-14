// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // fixed property name
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  loginUsername: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Guard sessionStorage access (prevents ReferenceError in SSR/build)
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('token');
      const userStr = sessionStorage.getItem('user');

      if (token && userStr) {
        this.isLoggedIn = true;
        this.loginUsername = this.parseUserFirstName(userStr);
      } else {
        this.isLoggedIn = false;
        this.loginUsername = '';
      }
    } else {
      // Not running in browser environment - treat as not logged in
      this.isLoggedIn = false;
      this.loginUsername = '';
    }
  }

  private parseUserFirstName(userStr: string): string {
    try {
      const user = JSON.parse(userStr);
      if (user && typeof user.username === 'string') {
        // return first word (first name) or full username if single word
        return user.username.split(' ')[0] || user.username;
      }
    } catch (e) {
      // invalid JSON in storage — clear it for safety
      console.warn('Invalid user JSON in sessionStorage', e);
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.removeItem('user');
      }
    }
    return '';
  }

  logOut() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.clear();
    }
    this.loginUsername = '';
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
