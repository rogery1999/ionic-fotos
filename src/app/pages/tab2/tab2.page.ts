/* eslint-disable @typescript-eslint/naming-convention */
import { ApplicationRef, Component } from '@angular/core';
import PostService from '../../services/post/post.service';
import { UiService } from '../../services/utils/ui.service';
import { NavController } from '@ionic/angular';
import GeolocationService from '../../services/utils/geolocation.service';
import CameraService from '../../services/utils/camera.service';
import { ImageOptions, CameraResultType, CameraSource } from '@capacitor/camera';

declare const window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  post = {
    mensaje: '',
    coords: '',
    position: false
  };
  loadingGeo = false;

  constructor(
    private postService: PostService,
    private uiService: UiService,
    private navController: NavController,
    private geolocationService: GeolocationService,
    private aplicationRef: ApplicationRef,
    private cameraService: CameraService
  ) {}

  crearPost(){
    const postInfo = {...this.post};
    delete postInfo.position;
    this.postService.createPost(postInfo).subscribe(
      (response) => {
        if(response.ok){
          this.post = {
            mensaje: '',
            coords: '',
            position: false
          };
          this.tempImages = [];
          this.navController.navigateBack('/main/tabs/tab1', {animated: true});
        }else{
          this.uiService.alertaInformativa('Ocurrió un error al intentar crear el post', 'Error');
        }
      }
    );
  }

  getGeolocation(){
    if(!this.post.position){
      this.post.coords = null;
      return;
    }
    this.loadingGeo = true;
    this.aplicationRef.tick();
    this.geolocationService.getLocation().subscribe(
      ({ok, error, position}) => {
        this.loadingGeo = false;
        if(!ok){
          this.uiService.alertaInformativa(error.message === 'location unavailable' ? 'Gps desactivado' : error, 'Error');
          this.post.position = false;
          this.post.coords = null;
        }else{
          this.post.coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          this.uiService.infoToast('Posicion obtenida');
        }
      }
    );
  }

  takePicture(openCamera: boolean){
    const options: ImageOptions = {
      resultType: CameraResultType.Uri,
      source: openCamera ? CameraSource.Camera : CameraSource.Photos
    };

    this.cameraService.makePhoto(options).subscribe(
      async ({ok, error, photo}) => {
        await this.uiService.presentLoading();
        if(!ok){
          this.uiService.dipearLoading();
          this.uiService.alertaInformativa(error, 'Error');
        }else{
          const img = window.Ionic.WebView.convertFileSrc(photo.path);
          this.tempImages.push(img);
          this.uiService.dipearLoading();
          this.postService.uploadImages(photo.path).subscribe(
            (response) => {
              if(!response.ok){
                this.uiService.alertaInformativa(response.error, 'Error');
              }else{
                this.uiService.infoToast('Imagen subida correctamente');
              }
              console.log('response file upload', response);
            }
          );
        }
      }
    );
  }
}
