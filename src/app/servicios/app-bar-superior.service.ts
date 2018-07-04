import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppBarSuperiorService {

  private titulo: BehaviorSubject<string>;

  // titulo = '';
  iconoMenu = true;

  constructor() {
    this.titulo = new BehaviorSubject<string>('Examen Universidad');
  }

  public obtenerTitulo(): Observable<string> {
    return this.titulo.asObservable();
  }

  establecerTitulo(titulo: string) {
    this.titulo.next(titulo);
  }



}
