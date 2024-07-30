import { CurrencyPipe, KeyValue, KeyValuePipe, JsonPipe } from '@angular/common';
import { Component, InputSignal, OnInit, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyTransformPipe } from '../../pipes/currency-converter.pipe';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-investment-table',
  standalone: true,
  imports: [CurrencyPipe, MatTableModule, CurrencyTransformPipe, KeyValuePipe, JsonPipe],
  templateUrl: './investment-table.component.html',
  styleUrl: './investment-table.component.scss'
})
export class InvestmentTableComponent {
  displayedColumns: string[] = ['year', 'interest', 'valueEndOfYear', 'annualInvestment', 'totalInterest', 'totalAmountInvested'];
  dataSource: InputSignal<{ [key: string]: number }[]> = input.required<{ [key: string]: number }[]>();
  currency: InputSignal<string> = input.required<string>();
  currencyValue: InputSignal<number> = input.required<number>();
}
