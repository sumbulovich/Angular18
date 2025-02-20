import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { TicketsStore } from '../../state/tickets.store';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    RouterModule,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent {
  readonly ticketsStore = inject(TicketsStore);
  isEditing: WritableSignal<boolean> = signal(false);

  loadTickets(event?: PageEvent): void {
    this.ticketsStore.loadTickets(event);
  }

  onRouterActivate<T>(component: T): void {
    this.isEditing.set(component instanceof AddTicketComponent);
  }
}
