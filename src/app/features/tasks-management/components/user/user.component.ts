import { Component, InputSignal, Signal, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  // Use signals instead of @Input({ required: true }) @Output()
  user: InputSignal<User> = input.required<User>()
  // Use computed signal instead of a getter
  imagePath: Signal<string> = computed(() => `https://ui-avatars.com/api/?name=${this.user().name}&background=random`);
}
