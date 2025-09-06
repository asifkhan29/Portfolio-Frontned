import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from '../../user/services/portfolio.service';
import { Portfolio } from '../../user/models/portfolio.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-portfolio',
  imports: [CommonModule],

  templateUrl: './public-portfolio.component.html'

})
export class PublicPortfolioComponent implements OnInit {
  id!: string;
  portfolio?: Portfolio;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private svc: PortfolioService   // now works
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) return;

    this.loading = true;
    this.svc.getPortfolioById(this.id).subscribe({
      next: (p: Portfolio) => {   // fixed typing
        this.portfolio = p;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
