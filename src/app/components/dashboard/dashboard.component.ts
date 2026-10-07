import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CatalogDefaultsService } from '../../services/catalog-defaults.service';
import { Product, Warehouse, Order } from '../../models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  recentOrders: Order[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    public catalogDefaults: CatalogDefaultsService
  ) {}

  ngOnInit(): void {
    this.warehouses = this.catalogDefaults.getWarehouses();
    this.recentOrders = this.catalogDefaults.getOrders();
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboard products:', err);
        this.isLoading = false;
      },
    });
  }

  // Summary Metrics
  get totalProducts(): number {
    return this.products.length;
  }

  get totalInventoryUnits(): number {
    return this.products.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
  }

  get totalInventoryValue(): number {
    return this.products.reduce(
      (acc, curr) => acc + (curr.price || 0) * (curr.quantity || 0),
      0
    );
  }

  get lowStockProducts(): Product[] {
    return this.products.filter((p) => (p.quantity || 0) >= 1 && (p.quantity || 0) <= 4);
  }

  get outOfStockProducts(): Product[] {
    return this.products.filter((p) => (p.quantity || 0) === 0);
  }

  get inStockProductsCount(): number {
    return this.products.filter((p) => (p.quantity || 0) >= 5).length;
  }

  get totalWarehouses(): number {
    return this.warehouses.length;
  }

  get pendingOrdersCount(): number {
    return this.recentOrders.filter(
      (o) => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Confirmed'
    ).length;
  }

  get completedOrdersCount(): number {
    return this.recentOrders.filter(
      (o) => o.status === 'Delivered' || o.status === 'Shipped'
    ).length;
  }

  // Stock Status Percentages
  get inStockPercentage(): number {
    if (!this.products.length) return 0;
    return Math.round((this.inStockProductsCount / this.products.length) * 100);
  }

  get lowStockPercentage(): number {
    if (!this.products.length) return 0;
    return Math.round((this.lowStockProducts.length / this.products.length) * 100);
  }

  get outOfStockPercentage(): number {
    if (!this.products.length) return 0;
    return Math.round((this.outOfStockProducts.length / this.products.length) * 100);
  }

  // Category breakdown for Overview chart
  get topCategories(): { category: string; count: number; units: number; percentage: number }[] {
    const map = new Map<string, { count: number; units: number }>();
    this.products.forEach((p) => {
      const cat = p.category || 'Accessories';
      const existing = map.get(cat) || { count: 0, units: 0 };
      existing.count += 1;
      existing.units += p.quantity || 0;
      map.set(cat, existing);
    });

    const totalUnits = this.totalInventoryUnits || 1;
    return Array.from(map.entries())
      .map(([category, val]) => ({
        category,
        count: val.count,
        units: val.units,
        percentage: Math.round((val.units / totalUnits) * 100),
      }))
      .slice(0, 4);
  }

  onImageError(event: any, product: Product): void {
    event.target.src = this.catalogDefaults.getFallbackSvg(product.name);
  }
}
