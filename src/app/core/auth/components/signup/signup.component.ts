import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '../../state/auth.store';

function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formControl: AbstractControl): { [key: string]: boolean } | null => {
    const password = formControl.parent?.get(passwordField)?.value;
    const confirmPassword = formControl.parent?.get(confirmPasswordField)?.value;
    if (password && confirmPassword && password !== confirmPassword) return { 'passwordMismatch': true };
    return null;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  readonly authStore = inject(AuthStore);
  form = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    repeatPassword: new FormControl<string>('', [Validators.required, confirmPasswordValidator('password', 'repeatPassword')]),
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.form.disable();
  }
}
