import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Respuesta } from '../../modelos/respuesta';

import { MatDialog } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';

import { RespuestasBajaComponent } from './respuestas-baja.component';

@Component({
  selector: 'app-respuestas-panel-inderioir',
  template: `
    <mat-list>
      <mat-list-item (click)="cambio()">Editar {{respuesta.nombre}}</mat-list-item>
      <mat-list-item (click)="baja()">Eliminar {{respuesta.nombre}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class RespuestasPanelInferiorComponent {

  respuesta: Respuesta = {
    id: '',
    nombre: '',
    orden: 0,
  };

  constructor(
    private panelInferiorMateriaRef: MatBottomSheetRef<RespuestasPanelInferiorComponent>,
    private router: Router,
    private servicio: AdministrarDBRepasarService,
    public dialog: MatDialog
  ) {
    this.respuesta = this.servicio.obtenerRespuesta();
  }

  cambio() {
    this.router.navigate(['/materias/secciones/preguntas/respuestas/cambio']);
    this.panelInferiorMateriaRef.dismiss();
  }

  baja() {
    this.dialog.open(RespuestasBajaComponent);
    this.panelInferiorMateriaRef.dismiss();
  }

}
