import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Order } from '../../models/product.model';
import { CatalogDefaultsService } from '../../services/catalog-defaults.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'All';
  selectedOrder: Order | null = null;

  readonly statusOrder = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered'];

  constructor(private catalogDefaults: CatalogDefaultsService) {}

  ngOnInit(): void {
    this.orders = this.catalogDefaults.getOrders();
  }

  get filteredOrders(): Order[] {
    return this.orders.filter((ord) => {
      const matchSearch =
        !this.searchTerm ||
        ord.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ord.warehouse.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'All' || ord.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  get totalOrdersCount(): number {
    return this.orders.length;
  }

  get totalOrdersRevenue(): number {
    return this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
  }

  openOrderDetails(order: Order): void {
    this.selectedOrder = order;
  }

  closeOrderDetails(): void {
    this.selectedOrder = null;
  }

  isStepCompleted(orderStatus: string, stepName: string): boolean {
    const currentIndex = this.statusOrder.indexOf(orderStatus);
    const stepIndex = this.statusOrder.indexOf(stepName);
    return stepIndex <= currentIndex;
  }

  isStepActive(orderStatus: string, stepName: string): boolean {
    return orderStatus === stepName;
  }
}
