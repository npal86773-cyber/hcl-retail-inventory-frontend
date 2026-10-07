import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: 'dashboard' },
];
