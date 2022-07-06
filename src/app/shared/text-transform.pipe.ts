import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "textTransform",
  pure: true
})

export class TextTransformPipe implements PipeTransform{

   transform(value: string, operator: 'capitalize' | 'lowercase' | 'uppercase' = 'capitalize'): string {
     value = !value ? '' : value

     if(operator == 'capitalize')
     return value.slice(0,1).toUpperCase() + value.slice(1).toLowerCase()

   }

}
