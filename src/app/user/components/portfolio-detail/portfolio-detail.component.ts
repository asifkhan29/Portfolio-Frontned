import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-portfolio-detail',
  standalone: false,
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit {
  id!: string;
  portfolio?: Portfolio;
  loading = false;
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private svc: PortfolioService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getPortfolioById(this.id).subscribe({
      next: (p) => {
        this.portfolio = p;
        this.editForm = this.fb.group({
          name: [p.name, Validators.required],
          email: [p.email],
          phoneNumber: [p.phoneNumber],
          address: [p.address],
          photoUrl: [p.photo],
          public: [p.public]
        });
        this.loading = false;
      },
      error: () => { this.loading = false; alert('Unable to load portfolio'); }
    });
  }

  save() {
    if (this.editForm.invalid) return;
    this.svc.updatePortfolio(this.id, this.editForm.value).subscribe({
      next: (p) => { this.portfolio = p; alert('Updated'); },
      error: () => alert('Update failed')
    });
  }

  delete() {
    if (!confirm('Delete this portfolio?')) return;
    this.svc.deletePortfolio(this.id).subscribe({
      next: () => { alert('Deleted'); this.router.navigate(['/user/home']); },
      error: () => alert('Delete failed')
    });
  }

  toggleVisibility() {
    this.svc.toggleVisibility(this.id).subscribe({
      next: (p) => { this.portfolio = p; alert('Visibility toggled'); },
      error: () => alert('Action failed')
    });
  }
}
