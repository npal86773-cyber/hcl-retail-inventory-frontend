import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CatalogDefaultsService } from '../../services/catalog-defaults.service';
import { Product, Warehouse, Order } from '../../models/product.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  orders: Order[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private catalogDefaults: CatalogDefaultsService
  ) {}

  ngOnInit(): void {
    this.warehouses = this.catalogDefaults.getWarehouses();
    this.orders = this.catalogDefaults.getOrders();
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  get totalValuation(): number {
    return this.products.reduce((acc, p) => acc + (p.price || 0) * (p.quantity || 0), 0);
  }

  get totalUnits(): number {
    return this.products.reduce((acc, p) => acc + (p.quantity || 0), 0);
  }

  get categoryBreakdown(): { category: string; count: number; totalStock: number; percentage: number }[] {
    const map = new Map<string, { count: number; totalStock: number }>();
    this.products.forEach((p) => {
      const cat = p.category || 'Other';
      const existing = map.get(cat) || { count: 0, totalStock: 0 };
      existing.count += 1;
      existing.totalStock += p.quantity || 0;
      map.set(cat, existing);
    });

    const totalStock = this.totalUnits || 1;
    return Array.from(map.entries()).map(([category, val]) => ({
      category,
      count: val.count,
      totalStock: val.totalStock,
      percentage: Math.round((val.totalStock / totalStock) * 100),
    }));
  }

  get warehouseBreakdown(): { name: string; units: number; capacity: number; percentage: number }[] {
    return this.warehouses.map((wh) => ({
      name: wh.name,
      units: wh.totalUnits,
      capacity: wh.capacityUnits,
      percentage: Math.round((wh.totalUnits / wh.capacityUnits) * 100),
    }));
  }
}
