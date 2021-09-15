import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import UserService from '../services/user/user.service';
import { switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export default class UsuarioGuard implements CanActivate, CanLoad {

  constructor(
    private userService: UserService,
    private navController: NavController
  ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.info().pipe(
      switchMap(({ok}) => {
        if(!ok){
          this.navController.navigateForward('/login', {animated: true});
        }
        return of(ok);
      })
    );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.info().pipe(
      switchMap(({ok}) => {
        if(!ok){
          this.navController.navigateForward('/login', {animated: true});
        }
        return of(ok);
      })
    );
  }
}
