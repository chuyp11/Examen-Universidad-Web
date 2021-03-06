import { Injectable } from '@angular/core';
import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';
import { Pregunta } from '../modelos/pregunta';
import { Respuesta } from '../modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class AdministrarDBRepasarService {

  materia: Materia = {
    id: '',
    nombre: '',
    orden: 0,
  };

  seccion: Seccion = {
    id: '',
    nombre: '',
    orden: 0,
  };

  pregunta: Pregunta = {
    id: '',
    nombre: '',
    orden: 0,
  };

  respuesta: Respuesta = {
    id: '',
    nombre: '',
    orden: 0,
  };

  cantidadMaterias: number;
  cantidadSecciones: number;
  cantidadPreguntras: number;
  cantidadRespuestas: number;

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

  obtenerCantidadMaterias(): number {
    return this.cantidadMaterias;
  }

  establecerCantidadMaterias(cantidad: number) {
    this.cantidadMaterias = cantidad;
  }

  obtenerCantidadSecciones(): number {
    return this.cantidadSecciones;
  }

  establecerCantidadSecciones(cantidad: number) {
    this.cantidadSecciones = cantidad;
  }

  obtenerCantidadPreguntas(): number {
    return this.cantidadPreguntras;
  }

  establecerCantidadPreguntas(cantidad: number) {
    this.cantidadPreguntras = cantidad;
  }

  obtenerCantidadRespuestas(): number {
    return this.cantidadRespuestas;
  }

  establecerCantidadRespuestas(cantidad: number) {
    this.cantidadRespuestas = cantidad;
  }

}
