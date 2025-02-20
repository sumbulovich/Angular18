import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  // This input is gotten from the parent route "/:userId" (withComponentInputBinding)
  // This approach doesn't need access to activatedRoute paramMap
  userId: InputSignal<string> = input.required<string>();
}
