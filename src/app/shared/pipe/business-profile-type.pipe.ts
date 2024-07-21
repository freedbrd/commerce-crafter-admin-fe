import { Pipe, PipeTransform } from '@angular/core';
import { BusinessProfileTypeEnum } from '../enums/business-profile-type.enum';

@Pipe({
  name: 'businessProfileType',
  standalone: true
})
export class BusinessProfileTypePipe implements PipeTransform {

  transform(value: BusinessProfileTypeEnum): string {
    switch (value) {
      case BusinessProfileTypeEnum.RETAIL:
        return 'Retail'
      case BusinessProfileTypeEnum.SERVICE:
        return 'Service'
      default:
        return 'unknown'
    }
  }

}
