import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'propFilter',
  pure: false
})
export class PropFilterPipe implements PipeTransform {
  transform(items: any[], property: any): any {
    if (!items || !property) {
      return items;
    }

    return _.filter(items, item => {
      return _.includes(_.values(item), property);
    })
  }
}
