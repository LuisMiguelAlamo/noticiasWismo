import { Component, Input} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';

@Component({
  selector: 'app-info-noticia',
  templateUrl: './info-noticia.component.html',
  styleUrls: ['./info-noticia.component.scss'],
})
export class InfoNoticiaComponent {

  // Inputs para recibir lod datos de las noticias y los índices
  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private platform: Platform, private iab: InAppBrowser) { }


  // Método que abre el navegador predeterminado dependiendo del sisteme Android o iOS
  openArticle(){
    if(this.platform.is('ios') || this.platform.is('android')){
      const browser = this.iab.create(this.noticia.url);
      browser.show();
      return;
    }

    window.open(this.noticia.url, '_blank');
  }

}
