import { AsyncPipe } from '@angular/common';
import { Component, OnInit, Signal, effect, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { AuthStore } from '../../state/auth.store';
import { ActivatedRoute, Router } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe, A11yModule],
  // providers: [AuthStore], // Signal Stores registered here or on root level with { providedIn: 'root' }
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private form: Signal<NgForm> = viewChild.required<NgForm>('form');

  // Regular Ngrx Store
  // this.isAuth$ = this.store.select(authFeature.selectIsAuth);
  // this.store.dispatch(AuthActions.login(this.form().value));

  constructor() {
    effect((onCleanup) => {
      if (this.authStore.isAuth()) this.router.navigate(['tasks'])
      onCleanup(() => console.log('Signal Effects Cleanup executed'))
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const email = this.route.snapshot.queryParamMap.get('success');
      this.form().setValue({ email, password: '' });
    });
  }

  onSubmit(): void {
    if (this.form().invalid) return;
    this.authStore.login(this.form().value);
  }
}
