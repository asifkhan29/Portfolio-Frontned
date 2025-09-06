import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  step = 1;
  loading = false;
  message = '';

  emailForm!: FormGroup;
  otpForm!: FormGroup;
  credsForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // ✅ initialize forms here (after fb is available)
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.credsForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  sendOtp() {
    if (this.emailForm.invalid) return;
    this.loading = true;
    this.auth.register(this.emailForm.value.email!).subscribe({
      next: () => {
        this.step = 2;
        this.loading = false;
      },
      error: err => {
        this.message = err.error || 'Error sending OTP';
        this.loading = false;
      }
    });
  }

  verifyOtp() {
    if (this.otpForm.invalid) return;
    this.loading = true;
    this.auth.verifyOtp(this.emailForm.value.email!, this.otpForm.value.otp!).subscribe({
      next: () => {
        this.step = 3;
        this.loading = false;
      },
      error: err => {
        this.message = err.error || 'Invalid OTP';
        this.loading = false;
      }
    });
  }

  setCreds() {
    if (this.credsForm.invalid) return;
    this.loading = true;
    this.auth.setCreds(
      this.emailForm.value.email!,
      this.credsForm.value.username!,
      this.credsForm.value.password!
    ).subscribe({
      next: () => {
        this.loading = false;
        alert('✅ Registration successful! You can now login.');
        this.router.navigate(['/user/login']);
      },
      error: err => {
        this.message = err.error || 'Error setting credentials';
        this.loading = false;
      }
    });
  }
  goToLogin() {
    this.router.navigate(['/user/login']);
  }

}
