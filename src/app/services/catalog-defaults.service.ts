import { Injectable } from '@angular/core';
import { Product, Warehouse, Supplier, Order } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogDefaultsService {
  // Realistic generic product images mapped by keyword
  private readonly imageMap: { [key: string]: string } = {
    laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80',
    keyboard: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
    mouse: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=80',
    cable: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    stand: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
    monitor: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
    headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    printer: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=80',
    tablet: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=80',
    camera: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
    default: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80',
  };

  // Preset image choices for Add/Edit product form
  readonly imagePresets = [
    { label: 'Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80' },
    { label: 'Keyboard', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80' },
    { label: 'Mouse', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=80' },
    { label: 'USB Cable', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80' },
    { label: 'Laptop Stand', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80' },
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' },
    { label: 'Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' },
    { label: 'Monitor', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80' },
  ];

  readonly categories = [
    'Electronics',
    'Computer Peripherals',
    'Accessories & Cables',
    'Office Equipment',
    'Audio & Wearables',
  ];

  readonly warehousesList = [
    'Delhi Central Hub',
    'Ghaziabad Logistics Park',
    'Lucknow Regional Depot',
    'Mumbai Fulfillment Center',
    'Bengaluru Tech Warehouse',
  ];

  readonly suppliersList = [
    'TechLogix Solutions India',
    'Apex Hardware Distributing',
    'Silicon Micro Electronics',
    'CableKraft Connectivity',
    'OmniDesk Retail Supply',
  ];

  // Enterprise Warehouses Demo Data
  private warehouses: Warehouse[] = [
    {
      id: 'WH-01',
      name: 'Delhi Central Hub',
      code: 'DEL-HQ-01',
      location: 'Okhla Phase III, New Delhi, India',
      manager: 'Rajesh Mehra',
      phone: '+91 98110 23411',
      productsCount: 48,
      totalUnits: 1250,
      capacityUnits: 2000,
      status: 'Operational',
    },
    {
      id: 'WH-02',
      name: 'Ghaziabad Logistics Park',
      code: 'GZB-LP-02',
      location: 'Industrial Area Site 4, Ghaziabad, UP',
      manager: 'Sunita Verma',
      phone: '+91 98711 44520',
      productsCount: 32,
      totalUnits: 890,
      capacityUnits: 1500,
      status: 'Operational',
    },
    {
      id: 'WH-03',
      name: 'Lucknow Regional Depot',
      code: 'LKO-RD-03',
      location: 'Transport Nagar, Lucknow, UP',
      manager: 'Amitabh Srivastava',
      phone: '+91 94150 78219',
      productsCount: 22,
      totalUnits: 410,
      capacityUnits: 1000,
      status: 'Operational',
    },
    {
      id: 'WH-04',
      name: 'Mumbai Fulfillment Center',
      code: 'BOM-FC-04',
      location: 'Bhiwandi Logistics Hub, Mumbai, MH',
      manager: 'Pradeep Kulkarni',
      phone: '+91 98200 55198',
      productsCount: 56,
      totalUnits: 1820,
      capacityUnits: 2000,
      status: 'Near Capacity',
    },
    {
      id: 'WH-05',
      name: 'Bengaluru Tech Warehouse',
      code: 'BLR-TW-05',
      location: 'Whitefield Industrial Zone, Bengaluru, KA',
      manager: 'Kavitha Nambiar',
      phone: '+91 98450 67234',
      productsCount: 40,
      totalUnits: 980,
      capacityUnits: 1800,
      status: 'Operational',
    },
  ];

  // Enterprise Suppliers Demo Data
  private suppliers: Supplier[] = [
    {
      id: 'SUP-01',
      name: 'TechLogix Solutions India',
      category: 'Computer Peripherals',
      contactPerson: 'Vikram Chawla',
      email: 'v.chawla@techlogixindia.com',
      phone: '+91 11 4567 8901',
      productsSupplied: 24,
      rating: 4.9,
      leadTimeDays: 3,
      status: 'Preferred',
    },
    {
      id: 'SUP-02',
      name: 'Apex Hardware Distributing',
      category: 'Electronics & Mounts',
      contactPerson: 'Pooja Singhania',
      email: 'orders@apexhardware.in',
      phone: '+91 22 2890 1122',
      productsSupplied: 18,
      rating: 4.7,
      leadTimeDays: 4,
      status: 'Active',
    },
    {
      id: 'SUP-03',
      name: 'Silicon Micro Electronics',
      category: 'Semiconductors & Boards',
      contactPerson: 'Arun Natarajan',
      email: 'arun@siliconmicro.co.in',
      phone: '+91 80 4112 3344',
      productsSupplied: 12,
      rating: 4.8,
      leadTimeDays: 5,
      status: 'Preferred',
    },
    {
      id: 'SUP-04',
      name: 'CableKraft Connectivity',
      category: 'Accessories & Cables',
      contactPerson: 'Mohd. Zafar',
      email: 'sales@cablekraft.com',
      phone: '+91 120 499 8877',
      productsSupplied: 30,
      rating: 4.6,
      leadTimeDays: 2,
      status: 'Active',
    },
    {
      id: 'SUP-05',
      name: 'OmniDesk Retail Supply',
      category: 'Office Equipment',
      contactPerson: 'Deepa Roy',
      email: 'deepa@omnidesk.in',
      phone: '+91 33 2234 5678',
      productsSupplied: 15,
      rating: 4.5,
      leadTimeDays: 4,
      status: 'Active',
    },
  ];

  // Enterprise Orders Demo Data
  private orders: Order[] = [
    {
      id: 'ORD-9421',
      orderNumber: 'SO-2026-9421',
      customerName: 'HCL Technologies Ltd (Procurement)',
      customerEmail: 'procure@hcltech.com',
      orderDate: '2026-10-01',
      warehouse: 'Delhi Central Hub',
      items: [
        { productName: 'Wireless Mechanical Keyboard', sku: 'KB-101', quantity: 4, unitPrice: 2499.0 },
        { productName: 'Gaming Mouse (RGB)', sku: 'GM-202', quantity: 4, unitPrice: 1199.0 },
      ],
      itemCount: 8,
      totalAmount: 14792.0,
      status: 'Processing',
      paymentMethod: 'Corporate Invoice Net 30',
    },
    {
      id: 'ORD-9420',
      orderNumber: 'SO-2026-9420',
      customerName: 'Bennett University Lab 3',
      customerEmail: 'labs@bennett.edu.in',
      orderDate: '2026-09-30',
      warehouse: 'Ghaziabad Logistics Park',
      items: [
        { productName: 'Laptop Stand Ergonomic', sku: 'LS-404', quantity: 2, unitPrice: 899.0 },
        { productName: 'USB-C Fast Cable 2M', sku: 'CB-303', quantity: 5, unitPrice: 299.0 },
      ],
      itemCount: 7,
      totalAmount: 3293.0,
      status: 'Shipped',
      paymentMethod: 'UPI / Online',
    },
    {
      id: 'ORD-9419',
      orderNumber: 'SO-2026-9419',
      customerName: 'InfoEdge Solutions',
      customerEmail: 'it.assets@infoedge.com',
      orderDate: '2026-09-29',
      warehouse: 'Delhi Central Hub',
      items: [
        { productName: 'Wireless Mechanical Keyboard', sku: 'KB-101', quantity: 2, unitPrice: 2499.0 },
      ],
      itemCount: 2,
      totalAmount: 4998.0,
      status: 'Delivered',
      paymentMethod: 'Net Banking',
    },
    {
      id: 'ORD-9418',
      orderNumber: 'SO-2026-9418',
      customerName: 'Cognitive Cloud Innovations',
      customerEmail: 'billing@cognitivecloud.io',
      orderDate: '2026-09-28',
      warehouse: 'Lucknow Regional Depot',
      items: [
        { productName: 'Gaming Mouse (RGB)', sku: 'GM-202', quantity: 1, unitPrice: 1199.0 },
        { productName: 'Laptop Stand Ergonomic', sku: 'LS-404', quantity: 1, unitPrice: 899.0 },
      ],
      itemCount: 2,
      totalAmount: 2098.0,
      status: 'Delivered',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'ORD-9417',
      orderNumber: 'SO-2026-9417',
      customerName: 'Apex Enterprise Hub',
      customerEmail: 'admin@apexenterprises.in',
      orderDate: '2026-09-27',
      warehouse: 'Mumbai Fulfillment Center',
      items: [
        { productName: 'USB-C Fast Cable 2M', sku: 'CB-303', quantity: 10, unitPrice: 299.0 },
      ],
      itemCount: 10,
      totalAmount: 2990.0,
      status: 'Confirmed',
      paymentMethod: 'Corporate Invoice',
    },
  ];

  getWarehouses(): Warehouse[] {
    return this.warehouses;
  }

  getSuppliers(): Supplier[] {
    return this.suppliers;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  /**
   * Enriches a product with realistic images and default metadata if missing.
   */
  enrichProduct(product: Product): Product {
    const nameLower = (product.name || '').toLowerCase();
    const skuLower = (product.sku || '').toLowerCase();

    // Determine realistic image
    let resolvedImage = product.imageUrl;
    if (!resolvedImage || resolvedImage.trim() === '') {
      if (nameLower.includes('laptop') || skuLower.includes('lap')) {
        resolvedImage = this.imageMap['laptop'];
      } else if (nameLower.includes('keyboard') || skuLower.includes('kb')) {
        resolvedImage = this.imageMap['keyboard'];
      } else if (nameLower.includes('mouse') || skuLower.includes('gm')) {
        resolvedImage = this.imageMap['mouse'];
      } else if (nameLower.includes('cable') || skuLower.includes('cb')) {
        resolvedImage = this.imageMap['cable'];
      } else if (nameLower.includes('stand') || skuLower.includes('ls')) {
        resolvedImage = this.imageMap['stand'];
      } else if (nameLower.includes('monitor') || skuLower.includes('mon')) {
        resolvedImage = this.imageMap['monitor'];
      } else if (nameLower.includes('headphone') || nameLower.includes('audio')) {
        resolvedImage = this.imageMap['headphones'];
      } else if (nameLower.includes('watch')) {
        resolvedImage = this.imageMap['watch'];
      } else if (nameLower.includes('phone')) {
        resolvedImage = this.imageMap['phone'];
      } else {
        resolvedImage = this.imageMap['default'];
      }
    }

    // Determine category
    let resolvedCategory = product.category;
    if (!resolvedCategory || resolvedCategory.trim() === '') {
      if (nameLower.includes('keyboard') || nameLower.includes('mouse')) {
        resolvedCategory = 'Computer Peripherals';
      } else if (nameLower.includes('cable') || nameLower.includes('stand')) {
        resolvedCategory = 'Accessories & Cables';
      } else if (nameLower.includes('laptop') || nameLower.includes('phone') || nameLower.includes('tablet')) {
        resolvedCategory = 'Electronics';
      } else {
        resolvedCategory = 'Computer Peripherals';
      }
    }

    return {
      ...product,
      imageUrl: resolvedImage,
      category: resolvedCategory,
      warehouse: product.warehouse || 'Delhi Central Hub',
      supplier: product.supplier || 'TechLogix Solutions India',
      reorderLevel: product.reorderLevel ?? 5,
      costPrice: product.costPrice ?? Math.round((product.price || 0) * 0.72),
      description: product.description || `Enterprise-grade ${product.name} designed for retail store distribution and commercial deployment.`,
    };
  }

  /**
   * High-contrast SVG placeholder fallback if an external image fails to load.
   */
  getFallbackSvg(name: string): string {
    const initial = (name || 'P').charAt(0).toUpperCase();
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f1f5f9"/><text x="50%" y="45%" font-family="Arial,sans-serif" font-size="42" font-weight="bold" fill="%2394a3b8" dominant-baseline="middle" text-anchor="middle">${initial}</text><text x="50%" y="70%" font-family="Arial,sans-serif" font-size="14" fill="%2364748b" dominant-baseline="middle" text-anchor="middle">Retail Item</text></svg>`;
  }
}
