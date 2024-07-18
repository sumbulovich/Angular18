import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from './models/ticket.model';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TicketComponent } from "./components/ticket/ticket.component";
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [AddTicketComponent, MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatExpansionModule, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  tickets: Ticket[] = [{ title: 'Ticket title', request: 'Ticket request', id: 1, status: 'open' }];
  isAdding: boolean = false;
  ticketEdited?: Ticket;

  toggleAdding(ticket?: Ticket): void {
    this.ticketEdited = ticket;
    this.isAdding = !this.isAdding;
  }

  addTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
  }

  editTicket(): void {
    const index: number = this.tickets.findIndex((f) => f.id === this.ticketEdited?.id);
    if (index > -1) this.tickets[index] = this.ticketEdited!;
  }

  closeTicket(ticket: Ticket) {
    ticket.status = 'closed'
  }
}
