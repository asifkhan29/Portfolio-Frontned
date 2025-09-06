import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DottedComponent } from '../background/dotted/dotted.component';
import { BubbleComponent } from '../background/bubble/bubble.component';
import { buffer } from 'rxjs';


type LoadingState = 'initial' | 'auth' | 'fetch' | 'setup';

@Component({
  selector: 'app-google-callback',
  standalone: true,
    imports: [CommonModule , DottedComponent , BubbleComponent],   // 👈 add CommonModule here

  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.css']
})
export class GoogleCallbackComponent implements OnInit {
  loadingState: LoadingState = 'initial';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (!code) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.loadingState = 'auth';
      await this.delay(500);

      this.loadingState = 'fetch';
      const response: any = await this.http.post(
        `http://localhost:8080/login/google/callback?code=${code}`,
        {}
      ).toPromise();

      this.loadingState = 'setup';
      localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

console.log('response.accessToken', response.accessToken)
      await this.delay(100);
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
