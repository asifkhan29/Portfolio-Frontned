import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private API_BASE = 'http://localhost:8080/api/auth';

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Observable<boolean | UrlTree> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      return of(this.router.createUrlTree(['/login']));
    }

    // Check if access token is valid
    return this.checkToken(accessToken).pipe(
      switchMap(res => {
        if (res.valid) {
          return of(true);
        }
       console.log('res.valid', res.valid)
        // If invalid, try refresh token
        if (refreshToken) {
          return this.refreshToken(refreshToken).pipe(
            map(resp => {
              localStorage.setItem('accessToken', resp.accessToken);
              return true;
            }),
            catchError(() => of(this.router.createUrlTree(['/login'])))
          );
        }

        return of(this.router.createUrlTree(['/login']));
      }),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }

  // Option A: send raw string for check-token
  private checkToken(accessToken: string): Observable<{ valid: boolean }> {
  return this.http.post<boolean>(
    `${this.API_BASE}/check-token`,
    accessToken,
    { headers: { 'Content-Type': 'text/plain' } }
  ).pipe(
    map(valid => ({ valid })) // wrap boolean into object
  );
}


  // Refresh token: send JSON body
  private refreshToken(refreshToken: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.API_BASE}/refresh`,
      { refreshToken } // JSON body
    );
  }

}
