import { Injectable } from '@angular/core';
import { Notas } from "../interfaces/interfaces";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private firestore: AngularFirestore) { }

// Método para crear una nueva nota, recibel como parámetro el nombre de la colección y el nuevo dato a añadir
 async create(collection, dato){
   try {
     return await this.firestore.collection(collection).add(dato);     
   } catch (error) {
     console.log(error);     
   }
  }

  // Método para borrar una nota de la BBDD, recibe como parámetro el nombre de la colección y el id del documento a eliminar
 async delete(collection, id){
   try {
     return await this.firestore.collection(collection).doc(id).delete();     
   } catch (error) {
     console.log(error);     
   }
  }

  // Método para acturalizar una nota de la BBDD, recibe como parámetro el nombre de la colección, el id del documento a actualizar y la nueva información
 async update(collection, id, dato){
   try {
     return await this.firestore.collection(collection).doc(id).update(dato);     
   } catch (error) {
     console.log(error);     
   }
  }

  // Método que devuelve todos los documentos de la colección que recibe como parámetro
 async getAll(collection){
   try {
     return await this.firestore.collection(collection).snapshotChanges();     
   } catch (error) {
     console.log(error);     
   }
  }

  // Método que devuelve el documento de la colección recibida como parámetro con el id también recibido como parámetro
  async getById(collection, id){
    try {
      return await this.firestore.collection(collection).doc(id).get();      
    } catch (error) {
      console.log(error);      
    }
  }



}
