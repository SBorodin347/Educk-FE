import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
  pure: true
})
export class UserFilterPipe implements PipeTransform{
   transform(users: any[], search: string): any[] {
     if (!search.trim()){
        return users;
      }
    return users.filter(user => user.firstName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
      || user.lastName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    )
  }
}

