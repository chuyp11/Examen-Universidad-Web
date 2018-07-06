import { Component } from '@angular/core';

import { RespuestasService } from '../../servicios/respuestas.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';
import { Pregunta } from '../../modelos/pregunta';
import { Respuesta } from '../../modelos/respuesta';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-respuestas-baja',
  template: `
    <h1 mat-dialog-title>Eliminar Respuesta</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la respuesta {{respuesta.nombre}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancelar()>Cancelar</button>
      <button mat-button (click)= confirmar() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class RespuestasBajaComponent {

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

  constructor(
    private respuestasService: RespuestasService,
    public dialogRef: MatDialogRef<RespuestasBajaComponent>,
    private servicio: AdministrarDBRepasarService ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.pregunta = this.servicio.obtenerPregunta();
      this.respuesta = this.servicio.obtenerRespuesta();
  }

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    this.respuestasService.baja(this.materia, this.seccion, this.pregunta, this.respuesta);
    this.dialogRef.close();
  }

}
