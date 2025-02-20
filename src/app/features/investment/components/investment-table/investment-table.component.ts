import { CurrencyPipe } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyTransformPipe } from '../../pipes/currency-converter.pipe';

@Component({
  selector: 'app-investment-table',
  standalone: true,
  imports: [CurrencyPipe, MatTableModule, CurrencyTransformPipe],
  templateUrl: './investment-table.component.html',
  styleUrl: './investment-table.component.scss',
})
export class InvestmentTableComponent {
  displayedColumns: string[] = [
    'year',
    'interest',
    'valueEndOfYear',
    'annualInvestment',
    'totalInterest',
    'totalAmountInvested',
  ];
  dataSource: InputSignal<Record<string, number>[]> =
    input.required<Record<string, number>[]>();
  currency: InputSignal<string> = input.required<string>();
  currencyValue: InputSignal<number> = input.required<number>();
}
