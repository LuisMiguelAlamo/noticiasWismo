import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  // Método que devuelve un Observable de tipo RespuestaTopHeadlines con las noticias de la API
  getTopHeadlines() {
    try {
      return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=f185c365f0724c71862e80f15a9210aa`);
    } catch (error) {
      console.log('error de acceso a la API');
    }
  }

  getTopHeadlinesCategory(categoria: string) {
    try {
      return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f185c365f0724c71862e80f15a9210aa`);
    } catch (error) {
      console.log('error de acceso a la API');
    }
  }
}
