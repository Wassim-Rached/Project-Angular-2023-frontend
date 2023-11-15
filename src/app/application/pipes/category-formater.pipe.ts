import { Pipe, PipeTransform } from '@angular/core';
import { Categorie } from '../classes/categorie';

@Pipe({
  name: 'categoryFormater',
})
export class CategoryFormaterPipe implements PipeTransform {
  transform(categories?: Categorie[], ...args: unknown[]): string {
    if (categories == undefined) return '';
    const FormatedCategories = categories.map(
      (categorie) => `<div class="badge bg-black"> ${categorie} </div>`
    );

    return FormatedCategories.join('');
  }
}
