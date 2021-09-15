import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class StorageService {

  constructor() { }

  public get(key: string){
    return from(Storage.get({key})).pipe(
      switchMap(({value}) => of(value))
    );
  }

  public set(key: string, value: string){
    return from(Storage.set({key, value})).pipe(
      switchMap(() => of(true)),
      catchError((err) => of(false))
    );
  }

  public remove(key: string){
    return from(Storage.remove({key})).pipe(
      switchMap(() => of(true)),
      catchError((err) => of(false))
    );
  }

  public clear(){
    return from(Storage.clear()).pipe(
      switchMap(() => of(true)),
      catchError((_) => of(false))
    );
  }
}
