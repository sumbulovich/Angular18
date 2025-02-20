import { NgClass } from '@angular/common';
import {
  Component,
  InputSignal,
  OutputEmitterRef,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/ticket.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    NgClass,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  ticket: InputSignal<Ticket> = input.required<Ticket>();
  className: InputSignal<string | undefined> = input<string | undefined>();
  close: OutputEmitterRef<void> = output<void>();
  delete: OutputEmitterRef<void> = output<void>();
}
