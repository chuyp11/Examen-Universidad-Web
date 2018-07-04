import { Component } from '@angular/core';

import { PreguntasService } from '../../servicios/preguntas.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';
import { Pregunta } from '../../modelos/pregunta';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-preguntas-baja',
  template: `
    <h1 mat-dialog-title>Eliminar Pregunta</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la pregunta {{pregunta.nombre}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancelar()>Cancelar</button>
      <button mat-button (click)= confirmar() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class PreguntasBajaComponent {

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

  constructor(
    private pregutasService: PreguntasService,
    public dialogRef: MatDialogRef<PreguntasBajaComponent>,
    private servicio: AdministrarDBRepasarService ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.pregunta = this.servicio.obtenerPregunta();
  }

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    this.pregutasService.baja(this.materia, this.seccion, this.pregunta);
    this.dialogRef.close();
  }

}
