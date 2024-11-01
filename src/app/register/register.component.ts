import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customerService } from '../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  passwordVisible: boolean = false; // Controla la visibilidad del password
  
  constructor(private fb: FormBuilder, private customerService: customerService, private router: Router, private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)
        ]
      ],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    }, { validators: this.matchPasswords('password', 'confirmPassword') });
  }

  get f() {
    return this.registerForm.controls;
  }

  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.get(password);
      const confirmPass = formGroup.get(confirmPassword);

      if (confirmPass?.errors && !confirmPass.errors['passwordMismatch']) {
        return;
      }

      if (pass?.value !== confirmPass?.value) {
        confirmPass?.setErrors({ passwordMismatch: true });
      } else {
        confirmPass?.setErrors(null);
      }
    };
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const userData = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      hash_password: this.f['password'].value,
      phone: this.f['phone'].value,
      role: 'user' // Agregamos el role directamente aquí
    };

    console.log('Datos enviados:', userData);

    this.customerService.register(userData).subscribe(
      response => {
        console.log('Usuario registrado con éxito:', response);
        this.toastr.success('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error durante el registro:', error);
        this.toastr.warning('Hubo un error al registrar el usuario');
      }
    );
  }
}
