/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { AuthResponse, IUserInfoResponse, IUsuario } from './user.interface';
import RequestTypes from '../api-rest/api-rest.constants';
import ApiRestService from '../api-rest/api-rest.service';
import UserRoutes from './user.constants';
import StorageService from '../utils/storage.service';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class UserService {

  startEndpoint = 'user';
  usuario: IUsuario;

  constructor(
    private apiService: ApiRestService,
    private storageService: StorageService
  ) { }

  public create(user: IUsuario): Observable<AuthResponse>{
    return this.apiService.request<AuthResponse>(RequestTypes.post, this.endpoint(UserRoutes.create), user).pipe(
      tap(({token}) => this.storageService.set('token', token))
    );
  }

  public login(credentials: any): Observable<AuthResponse>{
    return this.apiService.request<AuthResponse>(RequestTypes.post, this.endpoint(UserRoutes.login), credentials).pipe(
      tap(({token}) => this.storageService.set('token', token))
    );
  }

  public update(user: IUsuario): Observable<AuthResponse>{
    return this.storageService.get('token').pipe(
      switchMap((response) => {
        const headers = new HttpHeaders().set('x-token', response);
        return this.apiService.request<AuthResponse>(RequestTypes.post, this.endpoint(UserRoutes.update), user, {headers}).pipe(
          tap(({token}) => this.storageService.set('token', token))
        );
      }),
      catchError((_) => of({ok: false, token: null}))
    );
  }

  public info(): Observable<IUserInfoResponse>{
    return this.storageService.get('token').pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set('x-token', token);
        return this.apiService.request<IUserInfoResponse>(RequestTypes.get, this.endpoint(UserRoutes.info), null, {headers}).pipe(
          tap(({usuario}) => this.usuario = usuario)
        );
      }),
      catchError((_) => of({ok: false, usuario: null}))
    );
  }

  public logout(){
    return this.storageService.clear().pipe(
      tap(() => this.usuario = null)
    );
  }

  public get usuarioData(): IUsuario {
    const newUsuario = ({...this.usuario});
    delete newUsuario._id;
    return ({...newUsuario});
  }

  private endpoint(route: string){
    return `${this.startEndpoint}/${route}`;
  }
}
