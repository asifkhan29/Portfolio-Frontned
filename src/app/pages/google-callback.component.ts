import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { DottedComponent } from '../background/dotted/dotted.component';
import { BubbleComponent } from '../background/bubble/bubble.component';
import { environment } from '../../../environment';

type LoadingState = 'initial' | 'auth' | 'fetch' | 'setup';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule, DottedComponent, BubbleComponent],
  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.css']
})
export class GoogleCallbackComponent implements OnInit {

  loadingState: LoadingState = 'initial';
  private isProcessing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {

      const code = params['code'];

      if (!code || this.isProcessing) {
        return;
      }

      this.isProcessing = true;

      // 🔥 Remove code from URL immediately (prevents reuse on refresh)
      this.router.navigate([], {
        queryParams: {},
        replaceUrl: true
      });

      await this.processGoogleLogin(code);
    });
  }

  private async processGoogleLogin(code: string) {
    try {
      this.loadingState = 'auth';
      await this.delay(500);

      this.loadingState = 'fetch';

      const response: any = await firstValueFrom(
        this.http.get(
          `${environment.apiBaseUrl}/login/google/callback?code=${code}`
        )
      );

      this.loadingState = 'setup';

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      await this.delay(300);

      this.router.navigate(['/user/home']);

    } catch (err) {
      console.error('Authentication failed', err);
      this.router.navigate(['/login']);
    }
  }

  getLoadingMessage() {
    switch (this.loadingState) {
      case 'auth': return 'Authenticating...';
      case 'fetch': return 'Fetching your data...';
      case 'setup': return 'Getting things ready...';
      default: return 'Initializing...';
    }
  }

  getProgressWidth() {
    switch (this.loadingState) {
      case 'auth': return '33%';
      case 'fetch': return '66%';
      case 'setup': return '100%';
      default: return '10%';
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
