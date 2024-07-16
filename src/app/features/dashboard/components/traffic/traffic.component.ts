import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TestComponent } from '../tickets/components/test/test.component';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TestComponent],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.scss'
})
export class TrafficComponent {

}
