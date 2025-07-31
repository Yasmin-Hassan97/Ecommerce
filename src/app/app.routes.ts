import { Routes } from '@angular/router';
import { BlankComponent } from './layout/blank/blank.component';
import { AuthComponent } from './layout/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: BlankComponent,
    canActivate: [authGuard],
    title: 'Blank Layout',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Home Page!',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'categories!',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'cart!',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'products!',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brands!',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'All Orders!',
      },

      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'checkout!',
      },

      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'Product Details!',
      },
      {
        path: 'specificCategory/:id/:name',
        loadComponent: () =>
          import('./pages/specific-category/specific-category.component').then(
            (c) => c.SpecificCategoryComponent
          ),
        title: 'category Details!',
      },
      {
        path: 'wishList',
        loadComponent: () =>
          import('./pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
        title: 'Your WishList!',
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [loggedGuard],
    title: 'Auth Layout',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'Login Page!',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register Page!',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./shared/components/ui/forgot/forgot.component').then(
            (c) => c.ForgotComponent
          ),
        title: 'forgot password!',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
        title: 'Not Found!',
      },
    ],
  },
];
