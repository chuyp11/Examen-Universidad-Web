import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Pregunta } from '../../modelos/pregunta';

import { MatDialog } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';

import { PreguntasBajaComponent } from './preguntas-baja.component';

@Component({
  selector: 'app-preguntas-panel-inderioir',
  template: `
    <mat-list>
      <mat-list-item (click)="abrir()">Respuestas de {{pregunta.nombre}}</mat-list-item>
      <mat-list-item (click)="cambio()">Editar {{pregunta.nombre}}</mat-list-item>
      <mat-list-item (click)="baja()">Eliminar {{pregunta.nombre}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class PreguntasPanelInferiorComponent {

  pregunta: Pregunta = {
    id: '',
    nombre: '',
    orden: 0,
  };

  constructor(
    private panelInferiorMateriaRef: MatBottomSheetRef<PreguntasPanelInferiorComponent>,
    private router: Router,
    private servicio: AdministrarDBRepasarService,
    public dialog: MatDialog
  ) {
    this.pregunta = this.servicio.obtenerPregunta();
  }

  abrir() {
    this.router.navigate(['/materias/secciones/preguntas/respuestas']);
    this.panelInferiorMateriaRef.dismiss();
  }

  cambio() {
    this.router.navigate(['/materias/secciones/preguntas/cambio']);
    this.panelInferiorMateriaRef.dismiss();
  }

  baja() {
    this.dialog.open(PreguntasBajaComponent);
    this.panelInferiorMateriaRef.dismiss();
  }

}
