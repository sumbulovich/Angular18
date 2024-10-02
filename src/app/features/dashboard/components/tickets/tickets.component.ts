import { Component, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/ticket.model';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TicketsStore } from '../../state/tickets.store';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [AddTicketComponent, MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatExpansionModule, MatPaginatorModule, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {
  isAdding: boolean = false;
  ticketEdited?: Ticket;
  ticketsStore = inject(TicketsStore);

  constructor() {
    effect(() => {
      if (!this.ticketsStore.inProgress() && !this.ticketsStore.error()) {
        this.isAdding = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadTickets(this.ticketsStore.pageEvent())
  }

  toggleAdding(ticket?: Ticket): void {
    this.ticketEdited = ticket;
    this.isAdding = !this.isAdding;
  }

  loadTickets(event?: PageEvent): void {
    this.ticketsStore.loadTickets(event);
  }

  addTicket(ticket: Ticket): void {
    this.ticketsStore.addTicket(ticket);
  }

  editTicket(): void {
    this.ticketsStore.editTicket(this.ticketEdited!);
  }

  closeTicket(ticket: Ticket): void {
    this.ticketsStore.editTicket({ ...ticket, status: 'closed' });
  }

  deleteTicket(ticket: Ticket): void {
    this.ticketsStore.deleteTicket(ticket);
  }
}
