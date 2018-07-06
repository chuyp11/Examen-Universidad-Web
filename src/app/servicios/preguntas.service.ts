import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';
import { Pregunta } from '../modelos/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  preguntasCollection: AngularFirestoreCollection<Seccion>;
  preguntas: Observable<Seccion[]>;
  preguntaDoc: AngularFirestoreDocument<Seccion>;

  constructor(private afs: AngularFirestore) { }

  lectura(materia: Materia, seccion: Seccion) {
    this.preguntasCollection = this.afs.collection<Pregunta>
      (`materias/${materia.id}/secciones/${seccion.id}/preguntas`, ref => ref.orderBy('orden'));
    this.preguntas = this.preguntasCollection.valueChanges();
    return this.preguntas;
  }

  alta(materia: Materia, seccion: Seccion, pregunta: Pregunta) {
    const id = this.afs.createId();
    pregunta.id = id;
    this.preguntasCollection = this.afs.collection<Pregunta>(`materias/${materia.id}/secciones/${seccion.id}/preguntas`);
    this.preguntasCollection.doc(id).set(pregunta);
  }

  baja(materia: Materia, seccion: Seccion, pregunta: Pregunta) {
    this.preguntaDoc = this.afs.doc<Pregunta>(`materias/${materia.id}/secciones/${seccion.id}/preguntas/${pregunta.id}`);
    this.preguntaDoc.delete();
  }

  cambio(materia: Materia, seccion: Seccion, pregunta: Pregunta) {
    this.preguntaDoc = this.afs.doc<Pregunta>(`materias/${materia.id}/secciones/${seccion.id}/preguntas/${pregunta.id}`);
    this.preguntaDoc.update(pregunta);
  }
}
