import { Component, Input, InputSignal, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  // @Input({ required: true }) user!: User;
  // @Output() select = new EventEmitter<User>();
  user: InputSignal<User> = input.required<User>()
  select: OutputEmitterRef<User> = output<User>()
  imagePath: Signal<string> = computed(() => `https://ui-avatars.com/api/?name=${this.user().name}&background=random`)
}
