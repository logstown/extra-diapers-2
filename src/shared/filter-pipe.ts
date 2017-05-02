import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filterArr: any[]): any {
    if (!items || !filterArr) {
      return items;
    }

    return _.reject(items, item => {
      return _.some(filterArr, { '$key': item.$key });
    })
  }
}
