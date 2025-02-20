import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DUMMY_USERS } from './constants/dummy-users';
import { User } from './models/user.model';
import { InfoComponent } from '../../shared/components/info/info.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { layoutFeature } from '@app/core/layout/state/layout.reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    UserComponent,
    RouterOutlet,
    InfoComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tasks-management.component.html',
  styleUrl: './tasks-management.component.scss',
})
export class TasksManagementComponent {
  title: InputSignal<string | undefined> = input<string>(); // Data
  users: User[] = DUMMY_USERS;
  private store = inject(Store);
  // Convert Observable to Signal (Also read about toObservable())
  private isMobile$ = this.store.select(layoutFeature.selectIsMobile);
  isMobile: Signal<boolean> = toSignal(this.isMobile$, { initialValue: false });
}
