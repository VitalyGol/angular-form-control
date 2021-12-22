import { Pipe, PipeTransform } from '@angular/core';
import { IFormCustomError } from './models/form-custom-error.model';

@Pipe({
  name: 'errorMessage',
  pure: true
})
export class ErrorMessagePipe implements PipeTransform {

  transform(value: any, customError: IFormCustomError[]): any {
    if (value !== null && customError?.length > 0) {
      const properties = Object.keys(value);
      for (const element of properties) {
        const filtered = customError.filter((item) => item.type === element);
        if (filtered.length > 0) {
          return filtered[0].errorMessage;
        }
      }
    }
    return '';
  }

}
