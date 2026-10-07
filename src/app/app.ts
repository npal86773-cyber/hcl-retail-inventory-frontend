import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  isSidebarCollapsed = false;
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  globalSearch = '';

  currentUser = {
    name: 'Dr. A. Sharma',
    role: 'System Administrator',
    initials: 'AS',
    email: 'a.sharma@hclproject.org',
  };

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  onGlobalSearchSubmit(): void {
    if (this.globalSearch && this.globalSearch.trim()) {
      this.router.navigate(['/inventory'], {
        queryParams: { q: this.globalSearch.trim() },
      });
    }
  }

  logout(): void {
    this.isProfileMenuOpen = false;
    alert('Logged out of ProRetail™ Enterprise Session. You can re-enter anytime.');
  }
}
