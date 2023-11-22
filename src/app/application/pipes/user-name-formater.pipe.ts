import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNameFormater',
})
export class UserNameFormaterPipe implements PipeTransform {
  transform(username: string, ...args: unknown[]): string {
    return '@' + username;
  }
}
