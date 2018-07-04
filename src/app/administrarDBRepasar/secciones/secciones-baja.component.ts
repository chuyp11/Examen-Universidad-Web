import { Component } from '@angular/core';

import { SeccionesService } from '../../servicios/secciones.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-secciones-baja',
  template: `
    <h1 mat-dialog-title>Eliminar Seccion</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la seccion {{seccion.nombre}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancelar()>Cancelar</button>
      <button mat-button (click)= confirmar() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class SeccionesBajaComponent {

  materia: Materia = {
    id: '',
    nombre: '',
  };
  seccion: Seccion = {
    id: '',
    nombre: '',
  };

  constructor(
    private seccionesService: SeccionesService,
    public dialogRef: MatDialogRef<SeccionesBajaComponent>,
    private servicio: AdministrarDBRepasarService ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
  }

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    this.seccionesService.baja(this.materia, this.seccion);
    this.dialogRef.close();
  }

}
