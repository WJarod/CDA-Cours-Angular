import { NgIterable, Pipe, PipeTransform } from '@angular/core';
import { Offer } from './models/offer';

@Pipe({
  name: 'blackListFilter'
})
export class BlackListFilterPipe implements PipeTransform {

  transform(value: Offer[], writeBlacklisted: boolean): Offer[] {
    if (writeBlacklisted) {
      return value.filter(offer => offer.isBlacklisted);
    }
    else 
    {
      return value.filter(offer => !offer.isBlacklisted);
    }
  }

}
