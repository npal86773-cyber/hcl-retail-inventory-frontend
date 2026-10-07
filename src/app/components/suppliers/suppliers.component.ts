import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Supplier } from '../../models/product.model';
import { CatalogDefaultsService } from '../../services/catalog-defaults.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'All';
  viewMode: 'table' | 'grid' = 'table';
  selectedSupplier: Supplier | null = null;

  constructor(private catalogDefaults: CatalogDefaultsService) {}

  ngOnInit(): void {
    this.suppliers = this.catalogDefaults.getSuppliers();
  }

  get filteredSuppliers(): Supplier[] {
    return this.suppliers.filter((sup) => {
      const matchSearch =
        !this.searchTerm ||
        sup.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sup.contactPerson.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sup.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sup.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'All' || sup.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  openDetails(sup: Supplier): void {
    this.selectedSupplier = sup;
  }

  closeDetails(): void {
    this.selectedSupplier = null;
  }
}
