import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '../../state/auth.store';
import { AuthUser, Permission } from '../../models/authUser.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  form = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    repeatPassword: new FormControl<string>('', [Validators.required, confirmPasswordValidator('password', 'repeatPassword')]),
  });
  isSuccess$?: Observable<boolean>;
  isSuccess?: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.authStore.inProgress() ? this.form.disable() : this.form.enable();
    });
  }

  ngOnInit(): void {
    this.isSuccess$ = this.route.paramMap.pipe(map((paramMap) => !!paramMap.get('success')))
    this.isSuccess = !!this.route.snapshot.paramMap.get('success');

    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap)
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Manually detect changes
        this.cdr.detectChanges();
        debugger;
      }
    });
  }

  onSubmit(): void {
    this.router.navigate([], { queryParams: { success: 'hello'} })
    if (this.form.invalid) return;
    this.authStore.signup({ email: this.form.value.email!, password: this.form.value.password!, permission: 'user' });
  }
}
