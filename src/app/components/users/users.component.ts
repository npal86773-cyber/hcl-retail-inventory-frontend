import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users = [
    {
      id: 'USR-001',
      name: 'Dr. A. Sharma',
      email: 'a.sharma@hclproject.org',
      role: 'System Administrator',
      department: 'IT & System Architecture',
      status: 'Active',
      lastLogin: 'Today at 23:45',
    },
    {
      id: 'USR-002',
      name: 'Rajesh Mehra',
      email: 'r.mehra@delhihub.retail.in',
      role: 'Central Hub Manager',
      department: 'Warehouse Operations',
      status: 'Active',
      lastLogin: 'Yesterday at 18:20',
    },
    {
      id: 'USR-003',
      name: 'Priya Narayanan',
      email: 'p.narayanan@procure.in',
      role: 'Procurement Specialist',
      department: 'Vendor & Supply Chain',
      status: 'Active',
      lastLogin: 'Sep 30, 2026',
    },
    {
      id: 'USR-004',
      name: 'Karan Deshmukh',
      email: 'karan.d@inventoryops.in',
      role: 'Inventory Auditor',
      department: 'Stock Control',
      status: 'Active',
      lastLogin: 'Sep 29, 2026',
    },
  ];
}
