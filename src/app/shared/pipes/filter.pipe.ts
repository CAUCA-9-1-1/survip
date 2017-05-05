import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(array: any[], filter: any): any {
    const filterExpression = filter.filter.toLowerCase();
    return array.filter(item => {
      return !filterExpression || item[filter.field].toLowerCase().indexOf(filterExpression) !== -1;
    });
  }
}
