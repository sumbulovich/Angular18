import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  standalone: true,
})
export class CurrencyTransformPipe implements PipeTransform {
  transform(value: number, currencyValue: number): number {
    return value * currencyValue;
  }
}
