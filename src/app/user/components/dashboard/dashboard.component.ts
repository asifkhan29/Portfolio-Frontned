import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio } from '../../models/portfolio.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  total = 0;
  publicCount = 0;
  privateCount = 0;

  constructor(private svc: PortfolioService) {}

  ngOnInit(): void {
    this.svc.getMyPortfolios().subscribe({
      next: (data: Portfolio[]) => {
        this.total = data.length;
        this.publicCount = data.filter(p => p.public).length;
        this.privateCount = this.total - this.publicCount;
      },
      error: () => {}
    });
  }
}
