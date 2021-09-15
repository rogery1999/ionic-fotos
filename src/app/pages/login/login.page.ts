import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import UserService from '../../services/user/user.service';
import { UiService } from '../../services/utils/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {
  @ViewChild('slidePrincipal') ionSlides: IonSlides;

  avatars = [
      {
        img: 'av-1.png',
        seleccionado: true
      },
      {
        img: 'av-2.png',
        seleccionado: false
      },
      {
        img: 'av-3.png',
        seleccionado: false
      },
      {
        img: 'av-4.png',
        seleccionado: false
      },
      {
        img: 'av-5.png',
        seleccionado: false
      },
      {
        img: 'av-6.png',
        seleccionado: false
      },
      {
        img: 'av-7.png',
        seleccionado: false
      },
      {
        img: 'av-8.png',
        seleccionado: false
      },
  ];

  opt = {
    allowTouchMove: false
  };

  loginCredentials = {
    email: '',
    password: ''
  };

  registerCredentials = {
    email: '',
    nombre: '',
    password: '',
    avatar: 'av-1.png'
  };

  constructor(
    private userService: UserService,
    private navController: NavController,
    private uiService: UiService
  ) { }

  ngOnDestroy() {
    this.loginCredentials = {
      email: '',
      password: ''
    };
    this.registerCredentials = {
      email: '',
      nombre: '',
      password: '',
      avatar: 'av-1.png'
    };
  }

  ingresar(){
    this.ionSlides.slidePrev();
  }

  registrarme(){
    this.ionSlides.slideNext();
  }

  login(form: NgForm){
    if(form.invalid){ return;}
    this.userService.login({...this.loginCredentials}).subscribe(
      ({ok}) => {
        if(ok){
          this.navController.navigateForward('/main/tabs/tab1', {animated: true});
        }else{
          this.uiService.alertaInformativa('El usuario o contraseña no son correctos');
        }
      }
    );
  }

  register(form: NgForm){
    if(form.invalid){return;}
    this.userService.create({...this.registerCredentials}).subscribe(
      ({ok}) => {
        if(ok){
          this.navController.navigateForward('/main/tabs/tab1', {animated: true});
        }else{
          this.uiService.alertaInformativa('Ocurrio un error al registrarse, por favor inténtelo nuevamente');
        }
      }
    );
  }

  changeAvatar(avatar: string){
    this.registerCredentials.avatar = avatar;
  }
}
