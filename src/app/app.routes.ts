import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./presentation/pages/product-list/product-list.component').then(
        (component) => component.ProductListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import(
        './presentation/pages/product-create/product-create.component'
      ).then((component) => component.ProductCreateComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./presentation/pages/product-edit/product-edit.component').then(
        (component) => component.ProductEditComponent
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import(
        './presentation/pages/product-details/product-details.component'
      ).then((component) => component.ProductDetailsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./presentation/pages/not-found/not-found.component').then(
        (component) => component.NotFoundComponent
      ),
  },
];
