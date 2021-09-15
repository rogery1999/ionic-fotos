import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { from, Observable, of } from 'rxjs';
import { IGeolocationPosition } from './utils.interface';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class GeolocationService {

  constructor() { }

  public getLocation(): Observable<IGeolocationPosition>{
    return this.checkPermissions().pipe(
      switchMap((granted) => {
        if(granted){
          return this.getCurrentPosition();
        }else{
          return this.requestPermissions().pipe(
            switchMap((allowed) => {
              if(allowed){
                return this.getCurrentPosition();
              }else{
                throw new Error('Los permisos no fueron concedidos');
              }
            })
          );
        }
      }),
      catchError((error) => of({ok: false, error}))
    );
  }

  private getCurrentPosition(): Observable<IGeolocationPosition>{
    return from(Geolocation.getCurrentPosition()).pipe(
      switchMap((position) => of({ok: true, position}))
    );
  }

  private checkPermissions(): Observable<boolean>{
    return from(Geolocation.checkPermissions()).pipe(
      switchMap(({location}) => of(location === 'granted'))
    );
  }

  private requestPermissions(): Observable<boolean>{
    return from(Geolocation.requestPermissions()).pipe(
      switchMap(({location}) => of(location === 'granted'))
    );
  }
}
