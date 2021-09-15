import { Injectable } from '@angular/core';
import { Camera, CameraResultType, ImageOptions, Photo } from '@capacitor/camera';
import { from, of, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { IPhoto } from './utils.interface';

@Injectable({
  providedIn: 'root'
})
export default class CameraService {

  constructor() { }

  public makePhoto(options: ImageOptions): Observable<IPhoto>{
    return this.checkPermissions().pipe(
      switchMap((granted) => {
        if(granted){
          return this.getPhoto(options).pipe(
            switchMap((photo) => of({ok: true, photo}))
          );
        }else{
          return this.requestPermissions().pipe(
            switchMap((allowed) => {
              if(allowed){
                return this.getPhoto(options).pipe(
                  switchMap((photo) => of({ok: true, photo}))
                );
              }else{
                throw new Error('No se otorgaron los permisos necesarios');
              }
            })
          );
        }
      }),
      catchError((error) => of({ok: false, error}))
    );
  }

  private getPhoto(options: ImageOptions): Observable<Photo>{
    return from(Camera.getPhoto(options));
  }

  private checkPermissions(): Observable<boolean>{
    return from(Camera.checkPermissions()).pipe(
      switchMap(({camera, photos}) => camera === 'granted' && photos === 'granted' ? of(true) : of(false))
    );
  }

  private requestPermissions(): Observable<boolean>{
    return from(Camera.requestPermissions({permissions: ['camera', 'photos']})).pipe(
      switchMap(({camera, photos}) => camera === 'granted' && photos === 'granted' ? of(true) : of(false))
    );
  }
}
