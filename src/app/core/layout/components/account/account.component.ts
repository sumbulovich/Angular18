import { Component, computed, inject, Signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthDirective } from '@app/core/auth/directives/auth.directive';
import { AuthStore } from '@app/core/auth/state/auth.store';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule, MatMenuModule, AuthDirective],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  readonly authStore = inject(AuthStore)
  imagePath: Signal<string> = computed(() => {
    if (!this.authStore.user()?.name) return 'user-placeholder.png';
    return `https://ui-avatars.com/api/?name=${this.authStore.user()?.name}%20${this.authStore.user()?.lastName}&background=random`
  });
}
