import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PanelComponent } from './presentation/pages/panel/panel.component';

export const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './presentation/pages/product-list/product-list.component'
          ).then((component) => component.ProductListComponent),
        canActivate: [AuthGuard],
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
          import(
            './presentation/pages/product-edit/product-edit.component'
          ).then((component) => component.ProductEditComponent),
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
    ],
  },
];
