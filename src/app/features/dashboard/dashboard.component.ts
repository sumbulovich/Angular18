import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServerStatusComponent } from './components/server-status/server-status.component';
import { TicketsComponent } from './components/tickets/tickets.component';

@Component({
  standalone: true,
  imports: [ServerStatusComponent, TicketsComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
}
