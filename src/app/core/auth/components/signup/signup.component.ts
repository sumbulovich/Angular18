import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { debounceTime, map, Observable, of, timer } from 'rxjs';
import { AuthStore } from '../../state/auth.store';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { Permission } from '../../models/authUser.model';

function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control?.get(passwordField);
    const confirmPassword = control?.get(confirmPasswordField);
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ ...confirmPassword?.errors, 'passwordMismatch': true })
      return { 'passwordMismatch': true };
    }
    const errors = control.errors;
    if (errors) {
      delete errors['passwordMismatch'];
      confirmPassword?.setErrors(!!Object.keys(errors).length ? errors : null)
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, MatCheckboxModule, AsyncPipe, A11yModule, JsonPipe],
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
    passwords: new FormGroup({
      password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
      repeatPassword: new FormControl<string>('', [Validators.required]),
    }, confirmPasswordValidator('password', 'repeatPassword')),
    permission: new FormControl<Permission>('user', Validators.required),
    hobbies: new FormArray<FormControl<boolean>>([])
  });
  successEmail$?: Observable<string>;
  hobbies: string[] = ['fishing', 'hiking', 'programming'];

  constructor() {
    effect(() => {
      this.authStore.inProgress() ? this.form.disable() : this.form.enable();
    });
    this.successEmail$ = this.route.queryParamMap.pipe(map((paramMap) => paramMap.get('success') || ''))
    this.hobbies.forEach(() => this.form.controls.hobbies.push(new FormControl()))
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.authStore.signup({
      email: this.form.value.email!,
      name: this.form.value.name!,
      lastName: this.form.value.lastName!,
      password: this.form.value.passwords?.password!,
      hobbies: this.hobbies.filter((f, i) => this.form.value.hobbies![i]),
      permission: this.form.value.permission!,
    });
  }
}
