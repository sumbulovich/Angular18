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
import { map, Observable } from 'rxjs';

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
  errorMessage$?: Observable<string>;

  // Regular Ngrx Store
  // this.isAuth$ = this.store.select(authFeature.selectIsAuth);
  // this.store.dispatch(AuthActions.login(this.form().value));

  constructor() {
    effect((onCleanup) => {
      // Navigates while replacing the current state in history to prevent navigate to previous page with back button 
      if (this.authStore.isAuth()) this.router.navigate(['tasks'], { replaceUrl: true })
      // onCleanup(() => console.log('Signal Effects Cleanup executed'))
    });
    this.errorMessage$ = this.route.queryParamMap.pipe(map((paramMap) => paramMap.get('error') || ''))
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
