import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';

import { MatDialog } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';

import { MateriasBajaComponent } from './materias-baja.component';

@Component({
  selector: 'app-matrerias-panel-inderioir',
  template: `
    <mat-list>
      <mat-list-item (click)="abrir()">Secciones de {{materia.nombre}}</mat-list-item>
      <mat-list-item (click)="cambio()">Editar {{materia.nombre}}</mat-list-item>
      <mat-list-item (click)="baja()">Eliminar {{materia.nombre}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class MateriasPanelInferiorComponent {

  materia: Materia = {
    id: '',
    nombre: '',
  };

  constructor(
    private panelInferiorMateriaRef: MatBottomSheetRef<MateriasPanelInferiorComponent>,
    private router: Router,
    private servicio: AdministrarDBRepasarService,
    public dialog: MatDialog
  ) {
    this.materia = this.servicio.obtenerMateria();
  }

  abrir() {
    this.router.navigate(['materias/secciones']);
    this.panelInferiorMateriaRef.dismiss();
  }

  cambio() {
    this.router.navigate(['materias/cambio']);
    this.panelInferiorMateriaRef.dismiss();
  }

  baja() {
    this.dialog.open(MateriasBajaComponent);
    this.panelInferiorMateriaRef.dismiss();
  }

}
