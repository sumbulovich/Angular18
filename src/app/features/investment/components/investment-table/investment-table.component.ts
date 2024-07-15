import { CurrencyPipe } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-investment-table',
  standalone: true,
  imports: [CurrencyPipe, MatTableModule],
  templateUrl: './investment-table.component.html',
  styleUrl: './investment-table.component.scss'
})
export class InvestmentTableComponent {
  dataSource: InputSignal<{ [key: string]: number }[]> = input.required<{ [key: string]: number }[]>()
  displayedColumns: string[] = ['year', 'interest', 'valueEndOfYear', 'annualInvestment', 'totalInterest', 'totalAmountInvested'];
}
