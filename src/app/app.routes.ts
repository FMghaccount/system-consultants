import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./presentation/pages/product-list/product-list.component').then(
        (component) => component.ProductListComponent
      ),
    canActivate: [AuthGuard],
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
    path: 'create',
    loadComponent: () =>
      import(
        './presentation/pages/product-create/product-create.component'
      ).then((component) => component.ProductCreateComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./presentation/pages/product-edit/product-edit.component').then(
        (component) => component.ProductEditComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import(
        './presentation/pages/product-details/product-details.component'
      ).then((component) => component.ProductDetailsComponent),
    canActivate: [AuthGuard],
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
