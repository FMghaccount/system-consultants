import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LayoutService } from '../services/layout.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private _authService: AuthService = inject(AuthService);
  private _layoutService: LayoutService = inject(LayoutService);
  private router: Router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this._layoutService.showApp.next(true);
      if (this._authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this._layoutService.showApp.next(false);
      return false;
    }
  }
}
