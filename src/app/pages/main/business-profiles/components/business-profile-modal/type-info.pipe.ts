import { Pipe, PipeTransform } from '@angular/core';
import {
  BusinessProfileTypeEnum
} from '../../../../../shared/enums/business-profile-type.enum';

@Pipe({
  name: 'typeInfo',
  standalone: true
})
export class TypeInfoPipe implements PipeTransform {

  transform(value: BusinessProfileTypeEnum): string {
    switch (value) {
      case BusinessProfileTypeEnum.RETAIL:
        return `Select this option if your business sells physical products, such as clothing, food, electronics, home goods, or books. This includes businesses like clothing stores, grocery stores, electronics shops, home decor stores, and bookstores`
      case BusinessProfileTypeEnum.SERVICE:
        return `Select this option if your business provides personal services, such as haircuts, beauty treatments, wellness sessions, fitness training, dental care, or consultancy. This includes businesses like barbershops, beauty salons, massage therapists, personal trainers, dental clinics, and professional consultants.`
      default:
        return 'Select the business profile type'
    }
  }

}
