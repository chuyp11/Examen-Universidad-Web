import { Component } from '@angular/core';

import { MateriasService } from '../../servicios/materias.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-materias-baja',
  template: `
    <h1 mat-dialog-title>Eliminar Materia</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la materia {{materia.nombre}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancelar()>Cancelar</button>
      <button mat-button (click)= confirmar() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class MateriasBajaComponent {

  materia: Materia = {
    id: '',
    nombre: '',
    orden: 0,
  };

  constructor(
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<MateriasBajaComponent>,
    private servicio: AdministrarDBRepasarService ) {
      this.materia = this.servicio.obtenerMateria();
  }

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    this.materiasService.baja(this.materia);
    this.dialogRef.close();
  }

}
