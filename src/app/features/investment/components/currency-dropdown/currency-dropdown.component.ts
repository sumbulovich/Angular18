import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Component, InputSignal, ModelSignal, OnInit, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-currency-dropdown',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, AsyncPipe, KeyValuePipe],
  templateUrl: './currency-dropdown.component.html',
  styleUrl: './currency-dropdown.component.scss'
})
export class CurrencyDropdownComponent implements OnInit {
  currencies: InputSignal<string[]> = input.required<string[]>();
  currency: ModelSignal<string> = model.required<string>();

  ngOnInit(): void {
  }
}
