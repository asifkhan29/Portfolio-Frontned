import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portfolio } from '../models/portfolio.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private base = `${environment.apiBaseUrl}/api/portfolios`;

  constructor(private http: HttpClient) {}

  // Protected (user) endpoints
  getMyPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.base}/my`);
  }

  createPortfolio(payload: Partial<Portfolio>): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.base, payload);
  }

  updatePortfolio(id: string, payload: Partial<Portfolio>): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.base}/${id}`, payload);
  }

  deletePortfolio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  toggleVisibility(id: string): Observable<Portfolio> {
    return this.http.patch<Portfolio>(`${this.base}/${id}/visibility`, {});
  }

  // Public endpoint (no token)
  getPublicPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.base}/public`);
  }

  getPortfolioById(id: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.base}/${id}`);
  }
}
