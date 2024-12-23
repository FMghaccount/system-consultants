import { LayoutService } from './core/services/layout.service';
import { MenuItems } from './core/data/menu.data';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MenuItem } from './core/models/menu.model';
import { environment } from '../environments/environment';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatRippleModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  menuItems: MenuItem[] = MenuItems;

  layoutService = inject(LayoutService);
  private _router: Router = inject(Router);

  /**
   * @description logout user
   */
  logout() {
    localStorage.removeItem(environment.user);
    this.layoutService.showLogout.next(false);
    this._router.navigate(['/login']);
  }
}
