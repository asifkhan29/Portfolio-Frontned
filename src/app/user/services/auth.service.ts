import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  loginWithGoogle(): Observable<any> {
    return this.http.get(`http://localhost:8080/login/google`);
  }

  // 🔹 Force responseType to 'text'
  register(email: string) {
    return this.http.post(`${this.apiUrl}/register?email=${email}`, {}, { responseType: 'text' });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.apiUrl}/verify-otp?email=${email}&otp=${otp}`, {}, { responseType: 'text' });
  }

  setCreds(email: string, username: string, password: string) {
    return this.http.post(`${this.apiUrl}/set-creds`, { email, username, password }, { responseType: 'text' });
  }
}
