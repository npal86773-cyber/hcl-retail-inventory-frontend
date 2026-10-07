import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Warehouse } from '../../models/product.model';
import { CatalogDefaultsService } from '../../services/catalog-defaults.service';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css'],
})
export class WarehousesComponent implements OnInit {
  warehouses: Warehouse[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'All';
  viewMode: 'grid' | 'table' = 'grid';
  selectedWarehouse: Warehouse | null = null;

  constructor(private catalogDefaults: CatalogDefaultsService) {}

  ngOnInit(): void {
    this.warehouses = this.catalogDefaults.getWarehouses();
  }

  get filteredWarehouses(): Warehouse[] {
    return this.warehouses.filter((wh) => {
      const matchSearch =
        !this.searchTerm ||
        wh.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        wh.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        wh.code.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'All' || wh.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  get totalUnitsAll(): number {
    return this.warehouses.reduce((acc, curr) => acc + curr.totalUnits, 0);
  }

  get totalCapacityAll(): number {
    return this.warehouses.reduce((acc, curr) => acc + curr.capacityUnits, 0);
  }

  get averageUtilization(): number {
    if (!this.totalCapacityAll) return 0;
    return Math.round((this.totalUnitsAll / this.totalCapacityAll) * 100);
  }

  openDetails(wh: Warehouse): void {
    this.selectedWarehouse = wh;
  }

  closeDetails(): void {
    this.selectedWarehouse = null;
  }
}
