import { TrafficComponent } from './components/traffic/traffic.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { ServerStatusComponent } from './components/server-status/server-status.component';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  standalone: true,
  imports: [ServerStatusComponent, TicketsComponent, TrafficComponent, MatToolbarModule, TasksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
