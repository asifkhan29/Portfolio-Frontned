import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  portfolios: Portfolio[] = [];
  loading = false;
  error = '';

  constructor(private svc: PortfolioService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getMyPortfolios().subscribe({
      next: (data) => { this.portfolios = data; this.loading = false; },
      error: (err) => { this.error = 'Unable to load portfolios'; this.loading = false; }
    });
  }

  openDetail(p: Portfolio) {
    this.router.navigate(['/user/portfolio', p.id]);
  }

  goAdd() {
    this.router.navigate(['/user/portfolio/add']);
  }

  goDashboard() {
    this.router.navigate(['/user/dashboard']);
  }
}
