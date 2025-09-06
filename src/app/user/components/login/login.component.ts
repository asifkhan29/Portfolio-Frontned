import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = '';
  loading = false;

  loginForm!: FormGroup;
      showReadme = false;



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  openReadme() {
    this.showReadme = true;
  }

  closeReadme() {
    this.showReadme = false;
  }

  ngOnInit(): void {
    // ✅ initialize form after fb is available
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.auth.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
      next: (res) => {
        this.loading = false;
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate(['/user/home']);
      },
      error: () => {
        this.loading = false;
        this.message = 'Invalid credentials';
      }
    });
  }

  loginWithGoogle() {
  window.location.href = 'http://localhost:8080/login/google';
}
redirectToRegister() {
    this.router.navigate(['/user/register']);
  }


}
