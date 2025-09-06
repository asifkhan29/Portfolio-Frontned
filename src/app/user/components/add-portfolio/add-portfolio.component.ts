import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-portfolio',
  standalone: false,
  templateUrl: './add-portfolio.component.html'
})
export class AddPortfolioComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private svc: PortfolioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phoneNumber: [''],
      address: [''],
      skills: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('email', this.form.value.email);
    formData.append('phoneNumber', this.form.value.phoneNumber);
    formData.append('address', this.form.value.address);
    formData.append('skills', (this.form.value.skills || '')
      .split(',')
      .map((s: string) => s.trim())
      .join(','));
    formData.append('isPublic', 'true'); // or false depending on your UI

    if (this.selectedFile) {
      formData.append('userPhoto', this.selectedFile);
    }

this.svc.createPortfolio(formData as any).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/user/home']);
      },
      error: () => {
        this.loading = false;
        alert('Failed to create portfolio');
      }
    });
  }
}
