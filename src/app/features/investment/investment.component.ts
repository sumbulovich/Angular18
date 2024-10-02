import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InvestmentTableComponent } from "./components/investment-table/investment-table.component";
import { CurrencyDropdownComponent } from "./components/currency-dropdown/currency-dropdown.component";
import { CurrencyService } from './services/currency.service';
import { take } from 'rxjs';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, InvestmentTableComponent, CurrencyDropdownComponent],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent implements OnInit {
  form: FormGroup = new FormGroup({
    initialInvestment: new FormControl<number>(5),
    annualInvestment: new FormControl<number>(5),
    expectedReturn: new FormControl<number>(5),
    duration: new FormControl<number>(5)
  });
  // Use a signal with elements that have some impact on the UI when changes
  dataSource: WritableSignal<Record<string, number>[]> = signal<Record<string, number>[]>([]);
  currencyService: CurrencyService = inject(CurrencyService);
  currencies: string[] = [];
  currency: string = 'EUR';
  currencyMap: Record<string, number> = {};

  ngOnInit(): void {
    this.currencyService.getCurrency().pipe(take(1)).subscribe((currencyMap) => {
      this.currencies = Object.keys(currencyMap);
      this.currencyMap = currencyMap;
    });
  }

  calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration }: Record<string, number>) {
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    return annualData;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const results = this.calculateInvestmentResults(this.form.value);
    this.dataSource.set(results);
  }
}
