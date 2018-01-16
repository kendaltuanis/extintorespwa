import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noCurrency'
})
export class NoCurrencyPipe implements PipeTransform {

  transform(val: string): number {
    if (val !== undefined && val !== null) {
      // here we just remove the commas from value
      var value: string[] = val.split('.');
      return Number(value[0].replace(",", "").replace("₡", ""));
    } else {
      return 0;
    }
  }

}
