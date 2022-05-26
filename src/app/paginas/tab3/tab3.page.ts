import { Component, OnInit } from '@angular/core';

import { Camera, CameraResultType } from "@capacitor/camera";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  // Variable que almacenará la URL de la imagen
  urlImagen: string;
  // Array que almacenará todas las URL de las imagenes
  tempImages: string[] = []; 

  constructor(public toastController: ToastController) {}

  ngOnInit() {}

  // Método que toma la fotografía
  async takePhoto(){
    try {
      const img = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      this.urlImagen = img.webPath;
      this.tempImages.push(this.urlImagen);        
    } catch (error) {
      this.presentToast('Error al tomar la foto');
    }
  }

  // Toast que despliega la información recibida como parámetro
  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
    });
    toast.present();
  }

}
