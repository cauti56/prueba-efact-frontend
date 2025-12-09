import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true, // Marcamos como standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necesario para formGroup
  providers: [Auth] // 🔹 Permite inyectar Auth sin NG2003
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.error = null;

    const { ruc, password } = this.loginForm.value;

    this.authService.login(ruc, password).subscribe({
      next: () => {
        this.router.navigate(['/documents']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error en la autenticación';
        this.isLoading = false;
      }
    });
  }

  get rucControl() {
    return this.loginForm.get('ruc');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
