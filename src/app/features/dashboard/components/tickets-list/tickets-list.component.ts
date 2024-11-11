import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketsStore } from '../../state/tickets.store';
import { PageEvent } from '@angular/material/paginator';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [MatExpansionModule, MatDividerModule, TicketComponent],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss'
})
export class TicketsListComponent {
  readonly ticketsStore = inject(TicketsStore);

  closeTicket(ticket: Ticket): void {
    this.ticketsStore.editTicket({ ...ticket, status: 'closed' });
  }

  deleteTicket(ticket: Ticket): void {
    this.ticketsStore.deleteTicket(ticket);
  }
}
