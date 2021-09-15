import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const host = environment.host;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${ host }/post/imagen/${ userId }/${ img }`;
  }

}
