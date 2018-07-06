import { Injectable } from '@angular/core';
import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';
import { Pregunta } from '../modelos/pregunta';
import { Respuesta } from '../modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class PracticarService {

  materia: Materia = {
    id: '',
    nombre: '',
  };

  seccion: Seccion = {
    id: '',
    nombre: '',
  };

  pregunta: Pregunta = {
    id: '',
    nombre: '',
  };
  respuesta: Respuesta = {
    id: '',
    nombre: '',
  };


  constructor() {
  }

  obtenerMateria(): Materia  {
    return this.materia;
  }

  establecerMateria(materia: Materia) {
    this.materia = materia;
  }

  obtenerSeccion(): Seccion  {
    return this.seccion;
  }

  establecerSeccion(seccion: Seccion) {
      this.seccion = seccion;
  }

  obtenerPregunta(): Pregunta  {
    return this.pregunta;
  }

  establecerPregunta(pregunta: Pregunta) {
      this.pregunta = pregunta;
  }

  obtenerRespuesta(): Respuesta  {
    return this.respuesta;
  }

  establecerRespuesta(respuesta: Respuesta) {
      this.respuesta = respuesta;
  }
}
