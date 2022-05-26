import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias.component';
import { IonicModule } from '@ionic/angular';
import { InfoNoticiaComponent } from './info-noticia/info-noticia.component';



@NgModule({
  declarations: [NoticiasComponent, InfoNoticiaComponent],
  exports: [NoticiasComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentesModule { }
