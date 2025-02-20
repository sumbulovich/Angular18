import {
  Component,
  InputSignal,
  ModelSignal,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-currency-dropdown',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './currency-dropdown.component.html',
  styleUrl: './currency-dropdown.component.scss',
})
export class CurrencyDropdownComponent {
  currencies: InputSignal<string[]> = input.required<string[]>();
  currency: ModelSignal<string> = model.required<string>();
}
