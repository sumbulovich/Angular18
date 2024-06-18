import { Component, Input, InputSignal, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { layoutFeature } from '../../../../core/layout/state/layout.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  // @Input({ required: true }) user!: User;
  // @Output() select = new EventEmitter<User>();
  user: InputSignal<User> = input.required<User>()
  selectedUser: InputSignal<User> = input.required<User>()
  select: OutputEmitterRef<User> = output<User>()
  imagePath: Signal<string> = computed(() => `https://ui-avatars.com/api/?name=${this.user().name}&background=random`)
  isDarkTheme$: Observable<boolean>;

  constructor(private store: Store) {
    this.isDarkTheme$ = this.store.select(layoutFeature.selectIsDarkTheme);
  }
}
