import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full',
  },
  {
    path        : 'panel',
    loadChildren: () => import('./panel.routes').then(m => m.routes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./presentation/pages/login/login.component').then(
        (component) => component.LoginComponent
      ),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./presentation/pages/not-found/not-found.component').then(
        (component) => component.NotFoundComponent
      ),
    canActivate: [AuthGuard],
  },
];
