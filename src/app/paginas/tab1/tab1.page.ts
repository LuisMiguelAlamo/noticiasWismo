import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private noticiasService: NoticiasService, public toastController: ToastController) {}

  // Array de tipo Article que almacenará todas las noticias que devuelva el servicio getTopHeadlines
  noticias: Article[] = [];

  // Método OnInit llama al método getTopHeadlines del servicio de noticias y las carga, acumulandolas en el array de noticias
  ngOnInit(){
    try {
      this.noticiasService.getTopHeadlines().subscribe(resp => {
        console.log('noticias', resp);
        this.noticias.push(...resp.articles);
      });      
    } catch (error) {
      this.presentToast('Ha surgido un error al cargar los artículos')
    }
  }

  // Método que muestra un toast con la información que se desee mostrar en pantalla en cada caso
  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
    });
    toast.present();
  }

}
