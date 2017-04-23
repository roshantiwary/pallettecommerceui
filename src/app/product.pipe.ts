import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

   transform(items: any[], filerstore: any): any {
  		// Check if seach filerstore is undefined
       if(filerstore== undefined) return items;

       // else

       return items.filter(function(item) {
       		return item.productTitle.toLowerCase().includes(filerstore.toLowerCase())
       })
    }

}
