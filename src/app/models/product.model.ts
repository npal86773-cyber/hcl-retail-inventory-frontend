export interface Product {
  id?: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
  warehouse?: string;
  supplier?: string;
  costPrice?: number;
  reorderLevel?: number;
  description?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  manager: string;
  phone: string;
  productsCount: number;
  totalUnits: number;
  capacityUnits: number;
  status: 'Operational' | 'Near Capacity' | 'Maintenance';
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  productsSupplied: number;
  rating: number;
  leadTimeDays: number;
  status: 'Active' | 'Preferred' | 'Under Review';
}

export interface OrderItem {
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  warehouse: string;
  items: OrderItem[];
  itemCount: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
}
