import { Component, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InvestmentTableComponent } from "./components/investment-table/investment-table.component";

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, InvestmentTableComponent],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent {
  form: FormGroup = new FormGroup({
    initialInvestment: new FormControl<number>(0),
    annualInvestment: new FormControl<number>(0),
    expectedReturn: new FormControl<number>(0),
    duration: new FormControl<number>(0)
  });
  // Use a signal with elements that have some impact on the UI when changes
  dataSource: WritableSignal<{ [key: string]: number }[]> = signal<{ [key: string]: number }[]>([]);

  calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration }: { [key: string]: number }) {
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
