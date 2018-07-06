import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';
import { Pregunta } from '../modelos/pregunta';
import { Respuesta } from '../modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  respuestasCollection: AngularFirestoreCollection<Seccion>;
  respuesta: Observable<Respuesta[]>;
  respuestaDoc: AngularFirestoreDocument<Seccion>;

  constructor(private afs: AngularFirestore) { }

  lectura(materia: Materia, seccion: Seccion, pregunta: Pregunta) {
    this.respuestasCollection = this.afs.collection<Respuesta>
      (`materias/${materia.id}/secciones/${seccion.id}/preguntas/${pregunta.id}/respuestas`, ref => ref.orderBy('orden'));
    this.respuesta = this.respuestasCollection.valueChanges();
    return this.respuesta;
  }

  alta(materia: Materia, seccion: Seccion, pregunta: Pregunta, respuesta: Respuesta) {
    const id = this.afs.createId();
    respuesta.id = id;
    this.respuestasCollection = this.afs.collection<Respuesta>
      (`materias/${materia.id}/secciones/${seccion.id}/preguntas/${pregunta.id}/respuestas`);
    this.respuestasCollection.doc(id).set(respuesta);
  }

  baja(materia: Materia, seccion: Seccion, pregunta: Pregunta, respuesta: Respuesta) {
    this.respuestaDoc = this.afs.doc<Respuesta>
      (`materias/${materia.id}/secciones/${seccion.id}/preguntas/${pregunta.id}/respuestas/${respuesta.id}`);
    this.respuestaDoc.delete();
  }

  cambio(materia: Materia, seccion: Seccion, pregunta: Pregunta, respuesta: Respuesta) {
    this.respuestaDoc = this.afs.doc<Respuesta>
      (`materias/${materia.id}/secciones/${seccion.id}/preguntas/${pregunta.id}/respuestas/${respuesta.id}`);
    this.respuestaDoc.update(respuesta);
  }

}
