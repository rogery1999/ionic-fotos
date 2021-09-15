import { Component, OnInit } from '@angular/core';
import UserService from '../../services/user/user.service';
import { UiService } from '../../services/utils/ui.service';
import { NavController } from '@ionic/angular';
import { IUsuario } from 'src/app/services/user/user.interface';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  avatars = [
      {
        img: 'av-1.png',
        seleccionado: false
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

  usuario: IUsuario;

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private navController: NavController,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.usuario = this.userService.usuarioData;
  }

  logout(){
    this.userService.logout().subscribe(
      (response) => {
        if(response){
          this.postService.resetService();
          this.navController.navigateRoot('/login', {animated: true});
        }else{
          this.uiService.alertaInformativa('Ocurrió un error al intentar cerrar la sesión', 'Error');
        }
      }
    );
  }

  update(){
    this.userService.update({...this.usuario}).subscribe(
      ({ok}) => {
        if(ok){
          this.uiService.infoToast('Usuario actualizado');
        }else{
          this.uiService.alertaInformativa('Ocurrió un error al intentar actualizar sus datos', 'Error');
        }
      }
    );
  }

  changeAvatar(avatar: string){
    this.usuario.avatar = avatar;
  }
}
