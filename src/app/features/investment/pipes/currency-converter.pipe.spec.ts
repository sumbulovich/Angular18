import { CurrencyTransformPipe } from './currency-converter.pipe';

describe('EuroPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
