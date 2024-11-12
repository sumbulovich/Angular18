import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/ticket.model';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TicketsStore } from '../../state/tickets.store';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TicketComponent } from '../ticket/ticket.component';
import { RouterModule } from '@angular/router';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatExpansionModule, MatPaginatorModule, RouterModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  readonly ticketsStore = inject(TicketsStore);
  isEditing: WritableSignal<boolean> = signal(false);

  loadTickets(event?: PageEvent): void {
    this.ticketsStore.loadTickets(event);
  }

  onRouterActivate(event: any): void {
    this.isEditing.set(event instanceof AddTicketComponent)
  }
}
