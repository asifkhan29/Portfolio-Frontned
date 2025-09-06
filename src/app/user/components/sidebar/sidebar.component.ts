import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeLink = 'dashboard'; // default


  isSidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goDashboard() {
    this.activeLink = 'dashboard';
    this.router.navigate(['/user/dashboard']);
    this.isSidebarOpen = false;
  }

  goAdd() {
    this.activeLink = 'add';
    this.router.navigate(['/user/portfolio/add']);
    this.isSidebarOpen = false;
  }

  goHome() {
    this.activeLink = 'home';
    this.router.navigate(['/user/home']);
    this.isSidebarOpen = false;
  }

  load() {
    // You can trigger refresh logic here
    window.location.reload();
  }
  logout() {
    // Remove tokens (localStorage or sessionStorage depending on your implementation)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to login page
    this.router.navigate(['/user/login']);
  }



}
