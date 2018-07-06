import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  seccionesCollection: AngularFirestoreCollection<Seccion>;
  secciones: Observable<Seccion[]>;
  seccionDoc: AngularFirestoreDocument<Seccion>;

  constructor(private afs: AngularFirestore) { }

  lectura(materia: Materia) {
    this.seccionesCollection = this.afs.collection<Seccion>(`materias/${materia.id}/secciones`, ref => ref.orderBy('orden'));
    this.secciones = this.seccionesCollection.valueChanges();
    return this.secciones;
  }

  alta(materia: Materia, seccion: Seccion) {
    const id = this.afs.createId();
    seccion.id = id;
    this.seccionesCollection = this.afs.collection<Seccion>(`materias/${materia.id}/secciones`);
    this.seccionesCollection.doc(id).set(seccion);
  }

  baja(materia: Materia, seccion: Seccion) {
    this.seccionDoc = this.afs.doc<Seccion>(`materias/${materia.id}/secciones/${seccion.id}`);
    this.seccionDoc.delete();
  }

  cambio(materia: Materia, seccion: Seccion) {
    this.seccionDoc = this.afs.doc<Seccion>(`materias/${materia.id}/secciones/${seccion.id}`);
    this.seccionDoc.update(seccion);
  }
}
