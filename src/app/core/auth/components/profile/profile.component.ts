import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthStore } from '../../state/auth.store';
import { Permission } from '../../models/authUser.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  authStore = inject(AuthStore);
  user = computed(() => this.authStore.user()!);
  form = new FormGroup({
    email: new FormControl<string>(
      { value: this.user().email || '', disabled: true },
      Validators.required,
    ),
    name: new FormControl<string>(this.user().name || '', Validators.required),
    lastName: new FormControl<string>(
      this.user().lastName || '',
      Validators.required,
    ),
    permission: new FormControl<Permission>(
      { value: this.user().permission || 'user', disabled: true },
      Validators.required,
    ),
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.authStore.updateProfile({
      name: this.form.value.name!,
      lastName: this.form.value.lastName!,
    });
  }
}
