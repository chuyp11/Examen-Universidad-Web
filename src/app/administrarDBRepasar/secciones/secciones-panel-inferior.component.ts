import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Seccion } from '../../modelos/seccion';

import { MatDialog } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';

import { SeccionesBajaComponent } from './secciones-baja.component';

@Component({
  selector: 'app-secciones-panel-inderioir',
  template: `
    <mat-list>
      <mat-list-item (click)="abrir()">Preguntas de {{seccion.nombre}}</mat-list-item>
      <mat-list-item (click)="cambio()">Editar {{seccion.nombre}}</mat-list-item>
      <mat-list-item (click)="baja()">Eliminar {{seccion.nombre}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class SeccionesPanelInferiorComponent {

  seccion: Seccion = {
    id: '',
    nombre: '',
    orden: 0,
  };

  constructor(
    private panelInferiorMateriaRef: MatBottomSheetRef<SeccionesPanelInferiorComponent>,
    private router: Router,
    private servicio: AdministrarDBRepasarService,
    public dialog: MatDialog
  ) {
    this.seccion = this.servicio.obtenerSeccion();
  }

  abrir() {
    this.router.navigate(['/materias/secciones/preguntas']);
    this.panelInferiorMateriaRef.dismiss();
  }

  cambio() {
    this.router.navigate(['/materias/secciones/cambio']);
    this.panelInferiorMateriaRef.dismiss();
  }

  baja() {
    this.dialog.open(SeccionesBajaComponent);
    this.panelInferiorMateriaRef.dismiss();
  }

}
