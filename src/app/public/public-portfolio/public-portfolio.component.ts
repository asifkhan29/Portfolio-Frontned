import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from '../../user/services/portfolio.service';
import { Portfolio } from '../../user/models/portfolio.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-portfolio',
  imports: [CommonModule],
  templateUrl: './public-portfolio.component.html'
})
export class PublicPortfolioComponent implements OnInit, OnDestroy {
  id!: string;
  portfolio?: Portfolio;
  loading = false;
  iframeSrc: SafeResourceUrl | null = null;
  private blobUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private svc: PortfolioService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) return;

    this.loading = true;
    this.svc.getPortfolioById(this.id).subscribe({
      next: (p: Portfolio) => {
        // Replace placeholder with actual base64 photo
        if (p.generatedHtml && p.photo) {
          p.generatedHtml = p.generatedHtml.replace(
            /__PHOTO_BASE64__/g,
            `data:image/jpeg;base64,${p.photo}`
          );
        }
        this.portfolio = p;
        if (p.generatedHtml) {
          this.createIframeSrc(p.generatedHtml);
        }
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  private createIframeSrc(html: string): void {
    // Create a Blob from the HTML string
    const blob = new Blob([html], { type: 'text/html' });
    this.blobUrl = URL.createObjectURL(blob);
    // Mark the URL as safe for use in iframe src
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
  }

  ngOnDestroy(): void {
    // Release the blob URL to avoid memory leaks
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
    }
  }
}
