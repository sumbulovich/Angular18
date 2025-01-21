import { Component, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  text: InputSignal<string> = input.required<string>();
  icon: InputSignal<string> = input<string>('info');
}
