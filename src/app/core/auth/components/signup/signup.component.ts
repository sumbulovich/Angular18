import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthStore } from '../../state/auth.store';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { Permission } from '../../models/authUser.model';

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
  imports: [RouterModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, AsyncPipe, A11yModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly authStore = inject(AuthStore);
  private route = inject(ActivatedRoute);
  form = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    repeatPassword: new FormControl<string>('', [Validators.required, confirmPasswordValidator('password', 'repeatPassword')]),
    permission: new FormControl<Permission>('user', Validators.required),
  });
  successEmail$?: Observable<string>;

  constructor() {
    effect(() => {
      this.authStore.inProgress() ? this.form.disable() : this.form.enable();
    });
    this.successEmail$ = this.route.queryParamMap.pipe(map((paramMap) => paramMap.get('success') || ''))
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.authStore.signup({
      email: this.form.value.email!,
      name: this.form.value.name!,
      lastName: this.form.value.lastName!,
      password: this.form.value.password!,
      permission: this.form.value.permission!
    });
  }
}
