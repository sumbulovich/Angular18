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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [AddTicketComponent, MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatExpansionModule, MatPaginatorModule, TicketComponent, RouterModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {
  readonly ticketsStore = inject(TicketsStore);

  ngOnInit(): void {
    this.loadTickets(this.ticketsStore.pageEvent())
  }

  loadTickets(event?: PageEvent): void {
    this.ticketsStore.loadTickets(event);
  }

  closeTicket(ticket: Ticket): void {
    this.ticketsStore.editTicket({ ...ticket, status: 'closed' });
  }

  deleteTicket(ticket: Ticket): void {
    this.ticketsStore.deleteTicket(ticket);
  }
}
