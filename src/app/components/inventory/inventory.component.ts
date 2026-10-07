import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CatalogDefaultsService } from '../../services/catalog-defaults.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  // View & Filter states
  viewMode: 'grid' | 'table' = 'table';
  searchTerm = '';
  selectedCategory = 'All';
  selectedWarehouse = 'All';
  selectedStatus = 'All';
  sortBy = 'name_asc';

  // Pagination
  currentPage = 1;
  pageSize = 6;

  // Form modal state
  isFormModalOpen = false;
  isEditing = false;
  editingId: number | null = null;
  productForm!: Product;
  formError = '';

  // Details modal state
  selectedProductDetails: Product | null = null;

  // Notification Toast
  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';

  constructor(
    private productService: ProductService,
    public catalogDefaults: CatalogDefaultsService
  ) {
    this.productForm = this.getEmptyForm();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
        this.isLoading = false;
        this.showToast('Unable to load products. Please check server connection.', 'error');
      },
    });
  }

  // --- Filtering & Sorting ---
  get filteredProducts(): Product[] {
    const term = (this.searchTerm || '').toLowerCase().trim();

    const filtered = this.products.filter((p) => {
      const matchSearch =
        !term ||
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.sku && p.sku.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term));

      const matchCategory =
        this.selectedCategory === 'All' || p.category === this.selectedCategory;

      const matchWarehouse =
        this.selectedWarehouse === 'All' || p.warehouse === this.selectedWarehouse;

      let matchStatus = true;
      if (this.selectedStatus === 'In Stock') {
        matchStatus = (p.quantity || 0) >= 5;
      } else if (this.selectedStatus === 'Low Stock') {
        matchStatus = (p.quantity || 0) >= 1 && (p.quantity || 0) <= 4;
      } else if (this.selectedStatus === 'Out of Stock') {
        matchStatus = (p.quantity || 0) === 0;
      }

      return matchSearch && matchCategory && matchWarehouse && matchStatus;
    });

    // Sorting
    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'price_asc':
          return (a.price || 0) - (b.price || 0);
        case 'price_desc':
          return (b.price || 0) - (a.price || 0);
        case 'qty_asc':
          return (a.quantity || 0) - (b.quantity || 0);
        case 'qty_desc':
          return (b.quantity || 0) - (a.quantity || 0);
        case 'name_desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'name_asc':
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });
  }

  // --- Pagination Slice ---
  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize) || 1;
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All';
    this.selectedWarehouse = 'All';
    this.selectedStatus = 'All';
    this.sortBy = 'name_asc';
    this.currentPage = 1;
  }

  // --- CRUD Modals ---
  openAddModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.productForm = this.getEmptyForm();
    this.formError = '';
    this.isFormModalOpen = true;
  }

  openEditModal(product: Product): void {
    this.isEditing = true;
    this.editingId = product.id ?? null;
    this.productForm = {
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      category: product.category || 'Computer Peripherals',
      warehouse: product.warehouse || 'Delhi Central Hub',
      supplier: product.supplier || 'TechLogix Solutions India',
      costPrice: product.costPrice || Math.round((product.price || 0) * 0.72),
      reorderLevel: product.reorderLevel ?? 5,
      description: product.description || '',
    };
    this.formError = '';
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
    this.formError = '';
  }

  saveProduct(): void {
    this.formError = '';

    // Validation
    if (!this.productForm.name || !this.productForm.name.trim()) {
      this.formError = 'Please enter a valid product name.';
      return;
    }
    if (!this.productForm.sku || !this.productForm.sku.trim()) {
      this.formError = 'Product SKU is required and must be unique.';
      return;
    }
    if (this.productForm.price == null || this.productForm.price < 0) {
      this.formError = 'Price cannot be negative.';
      return;
    }
    if (this.productForm.quantity == null || this.productForm.quantity < 0) {
      this.formError = 'Stock quantity cannot be negative.';
      return;
    }

    if (this.isEditing && this.editingId != null) {
      this.productService.updateProduct(this.editingId, this.productForm).subscribe({
        next: () => {
          this.showToast(`Product "${this.productForm.name}" updated successfully.`);
          this.closeFormModal();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.formError = 'Could not update product. Ensure SKU is unique.';
        },
      });
    } else {
      this.productService.addProduct(this.productForm).subscribe({
        next: () => {
          this.showToast(`Product "${this.productForm.name}" added to inventory.`);
          this.closeFormModal();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.formError = 'Could not save product. Ensure SKU is unique.';
        },
      });
    }
  }

  deleteProduct(product: Product): void {
    if (!product.id) return;
    const confirmed = confirm(
      `Are you sure you want to delete "${product.name}" (SKU: ${product.sku}) from inventory?`
    );
    if (!confirmed) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.showToast(`Product "${product.name}" deleted.`);
        if (this.selectedProductDetails?.id === product.id) {
          this.selectedProductDetails = null;
        }
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.showToast('Failed to delete product. Please try again.', 'error');
      },
    });
  }

  // --- Product Details Modal ---
  openDetails(product: Product): void {
    this.selectedProductDetails = product;
  }

  closeDetails(): void {
    this.selectedProductDetails = null;
  }

  getWarehouseBreakdown(product: Product): { warehouse: string; qty: number; status: string }[] {
    const total = product.quantity || 0;
    if (total === 0) {
      return [
        { warehouse: 'Delhi Central Hub', qty: 0, status: 'Out of Stock' },
        { warehouse: 'Ghaziabad Logistics Park', qty: 0, status: 'Out of Stock' },
        { warehouse: 'Lucknow Regional Depot', qty: 0, status: 'Out of Stock' },
      ];
    }
    const delhiQty = Math.ceil(total * 0.6);
    const ghaziabadQty = Math.floor(total * 0.3);
    const lucknowQty = total - (delhiQty + ghaziabadQty);

    return [
      { warehouse: 'Delhi Central Hub', qty: delhiQty, status: delhiQty >= 5 ? 'In Stock' : (delhiQty > 0 ? 'Low Stock' : 'Out of Stock') },
      { warehouse: 'Ghaziabad Logistics Park', qty: ghaziabadQty, status: ghaziabadQty >= 5 ? 'In Stock' : (ghaziabadQty > 0 ? 'Low Stock' : 'Out of Stock') },
      { warehouse: 'Lucknow Regional Depot', qty: lucknowQty, status: lucknowQty >= 5 ? 'In Stock' : (lucknowQty > 0 ? 'Low Stock' : 'Out of Stock') },
    ];
  }

  // --- Helpers ---
  selectPresetImage(url: string): void {
    this.productForm.imageUrl = url;
  }

  onImageError(event: any, product: Product): void {
    event.target.src = this.catalogDefaults.getFallbackSvg(product.name);
  }

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3500);
  }

  getDefaultImageUrl(): string {
    return (
      this.catalogDefaults?.imagePresets?.[0]?.url ||
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80'
    );
  }

  private getEmptyForm(): Product {
    return {
      name: '',
      sku: '',
      price: 0,
      quantity: 0,
      imageUrl: this.getDefaultImageUrl(),
      category: 'Computer Peripherals',
      warehouse: 'Delhi Central Hub',
      supplier: 'TechLogix Solutions India',
      costPrice: 0,
      reorderLevel: 5,
      description: '',
    };
  }
}
