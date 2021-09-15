import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private ionLoading: HTMLIonLoadingElement;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async alertaInformativa(message: string, header: string = 'Alerta'){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async infoToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading(message: string = 'Por favor espere...') {
    this.ionLoading = await this.loadingController.create({
      message,
      duration: 6000
    });
    await this.ionLoading.present();
  }

  async dipearLoading(){
    await this.ionLoading.dismiss();
  }
}
