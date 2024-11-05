import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  // This input is gotten from Router "/:userId" (withComponentInputBinding)
  // This approach doesn't need access to activatedRoute paramMap
  userId: InputSignal<string> = input.required<string>();
}
