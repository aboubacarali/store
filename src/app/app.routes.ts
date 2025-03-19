import { Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {CartComponent} from './components/cart/cart.component';
import {AdminProductListComponent} from './components/admin/admin-product-list/admin-product-list.component';
import {AdminProductFormComponent} from './components/admin/admin-product-form/admin-product-form.component';

export const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  { path: 'admin/products', component: AdminProductListComponent },
  { path: 'admin/products/create', component: AdminProductFormComponent },
  { path: 'admin/products/edit/:id', component: AdminProductFormComponent },
];
