import { TicketsComponent } from './components/tickets/tickets.component';
import { ServerStatusComponent } from './components/server-status/server-status.component';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TasksComponent } from '../tasks-management/components/tasks/tasks.component';
import { WebsocketService } from '@app/shared/services/websocket.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [ServerStatusComponent, TicketsComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
}
