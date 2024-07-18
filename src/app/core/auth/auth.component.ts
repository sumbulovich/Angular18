import { AsyncPipe } from '@angular/common';
import { Component, Signal, effect, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/auth.service';
import { AuthStore } from './state/auth.store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe],
  // Signal Stores can be are registered here if are not set on root level with { providedIn: 'root' }
  // providers: [AuthStore],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  authService: AuthService = inject(AuthService);
  readonly authStore = inject(AuthStore);
  private form: Signal<NgForm> = viewChild.required<NgForm>('form');

  // Regular Ngrx Store
  // this.isAuth$ = this.store.select(authFeature.selectIsAuth);
  // this.store.dispatch(AuthActions.login(this.form().value));

  constructor() {
    setTimeout(() => this.form().setValue({ email: 'admin@example.com', password: 'admin' }));
  }

  submit(): void {
    if (this.form().invalid) return;
    this.authStore.login(this.form().value);
  }
}
