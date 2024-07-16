import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TestComponent } from "./components/test/test.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TestComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {

}
