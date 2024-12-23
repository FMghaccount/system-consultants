import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * @description simulate user login
   * @param {string} username
   * @param {string} password
   * @returns
   */
  login(username: string, password: string): boolean {
    const validUsername = 'user';
    const validPassword = 'user-password';
    if (username === validUsername && password === validPassword) {
      localStorage.setItem(environment.user, JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  /**
   * @description check if user is logged-in
   */
  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      let canShow = localStorage.getItem(environment.user) !== null;
      return canShow;
    } else {
      return false;
    }
  }
}
