import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { NotasService } from "../../services/notas.service";
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

// Variable que representa un objeto de tipo nota, o lo que es lo mismo un documento de la colección de notas
 nota = {
   titulo: '',
   texto: ''
 }

  // array de tipo any que acumulará los documentos de las notas
  listaNotas: any[] = []

  constructor(private notaServ: NotasService, public alertController: AlertController, 
    public modalController: ModalController, public toastController: ToastController) {}

    // Método OnInit que llama al servicio de notas y las carga al iniciar la clase
  ngOnInit(){
    this.notaServ.getAll('notas').then(firebaseResp => {
      firebaseResp.subscribe(listaNotasRef => {
        this.listaNotas = listaNotasRef.map(notaRef => {
          let nota = notaRef.payload.doc.data();
          nota['id'] = notaRef.payload.doc.id;
          return nota;
        })
      })
    }).catch(() => {
      this.presentToast('Error al cargar las notas');
    });
  }

  //Método que llama al servicio de notas y crea una nueva nota
  crear(){
    if (this.nota.titulo == '' || this.nota.texto == '') {
      this.presentToast('Debe introducir los datos.');
    } else {
      this.notaServ.create('notas', this.nota).then(resp => {
        this.limpiarInputs();
        this.presentToast('Nota creada correctamente.');
      }).catch(() =>{
        this.presentToast('error en el alta');      
      });      
    }
  }

  // Método que elimina una nota haciendo la llamada al servicio delete
  eliminar(id){
    this.notaServ.delete('notas', id).then(resp => {
      this.presentToast('Nota eliminada.');
    }).catch(() => {
      this.presentToast("error al eliminar la nota");      
    })
  }

  // Método que llama a al alert presentAlertPrompt para introducir los nuevos datos
  editar(tarea) {
    this.presentAlertPrompt(tarea).then(()=> {
      this.presentToast('La nota ha sido editada');
    }).catch(()=> {
      this.presentToast("error al editar la nota");
    });
  }

  // Método para limpiar los inputs cada vez que se necesite
  private limpiarInputs(){
    this.nota.titulo = '',
    this.nota.texto = ''
  }

  
  
  // Método que muestra un alert de tipo prompt para introducir los datos
  // y que a su vez llama al método handleEdit para que los envíe
  private async presentAlertPrompt(tarea) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edite la nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Escribe el título',
          value: tarea.titulo || ""
        },
        {
          name: 'texto',
          type: 'textarea',
          placeholder: 'Escribe el texto',
          value: tarea.texto || ""
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',          
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.handleEdit(tarea.id,  data)
          }
        }
      ]
    });
    await alert.present();
  }

  // Método que se encarga de llamar al servicio update, enviándole los datos que recoge el alertPrompt
  private handleEdit(id, data){
    if(data){
      console.log(id, data);
       this.notaServ.update('notas', id, data).catch(err => {
        console.log("error al eliminar");
      }) 
      
    }
  }


  // Método para presentar el modal con la información de la nota seleccionada
  async presentModal(titulo: string, texto: string) {
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps: {
        titulo: titulo,
        texto: texto
      }
    });
    return await modal.present();
  }


  // Método para presentar el toast con la información que se desee enviar en cada momento
  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
    });
    toast.present();
  }
  

}
