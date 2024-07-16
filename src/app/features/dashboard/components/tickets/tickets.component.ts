import { Component, Signal, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  submit(): void {
    this.form().nativeElement.reset();
  }
}
