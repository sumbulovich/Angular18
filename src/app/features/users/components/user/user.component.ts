import { AsyncPipe } from '@angular/common';
import { Component, InputSignal, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { layoutFeature } from '../../../../core/layout/state/layout.reducer';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AsyncPipe, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  // Use signals instead of @Input({ required: true }) @Output()
  user: InputSignal<User> = input.required<User>()
  selectedUser: InputSignal<User> = input.required<User>()
  select: OutputEmitterRef<void> = output<void>()
  // Use computed signal instead of a getter
  imagePath: Signal<string> = computed(() => `https://ui-avatars.com/api/?name=${this.user().name}&background=random`);
}
