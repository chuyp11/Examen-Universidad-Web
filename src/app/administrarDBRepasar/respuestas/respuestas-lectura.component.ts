import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { RespuestasService } from '../../servicios/respuestas.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';
import { Pregunta } from '../../modelos/pregunta';
import { Respuesta } from '../../modelos/respuesta';

import { MatTableDataSource, MatBottomSheet } from '@angular/material';

import { RespuestasPanelInferiorComponent } from './respuestas-panel-inferior.component';

@Component({
  selector: 'app-respuestas-lectura',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Respuestas</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card>
    <mat-card-title>{{materia.nombre}} / {{seccion.nombre}} / {{pregunta.nombre}}</mat-card-title>
      <mat-table #table [dataSource]="dataSource">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let respuesta"> {{respuesta.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
          <mat-cell *matCellDef="let respuesta"> {{respuesta.nombre}} </mat-cell>
        </ng-container>
        <ng-container matColumnDef="orden">
          <mat-header-cell *matHeaderCellDef> Orden </mat-header-cell>
          <mat-cell *matCellDef="let respuesta"> {{respuesta.orden}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let respuesta; columns: displayedColumns;" (click) = mostrarPanelInferior(respuesta) ></mat-row>
      </mat-table>
    </mat-card>
    <!-- floating-button-->
    <button class="floating-button" mat-fab
    (click)="alta()"><mat-icon>add</mat-icon>
    </button>
  </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],

})
export class RespuestasLecturaComponent implements OnInit, OnDestroy  {

  respuestas: Respuesta[] = [];
  displayedColumns = ['nombre', 'orden'];
  dataSource: any;

  suscripcion: any;

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

  constructor(
    private respuestasService: RespuestasService,
    private panelInferioir: MatBottomSheet,
    private servicio: AdministrarDBRepasarService,
    private router: Router,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.pregunta = this.servicio.obtenerPregunta();
      this.lectura();
  }

  ngOnInit() {
  }

  alta() {
    this.router.navigate(['materias/secciones/preguntas/respuestas/alta']);
  }

  lectura() {
    this.suscripcion = this.respuestasService.lectura(this.materia, this.seccion, this.pregunta)
      .subscribe((respuestas: Respuesta[]) => {
        this.respuestas = respuestas;
        this.dataSource = new MatTableDataSource(this.respuestas);
        this.servicio.establecerCantidadRespuestas(this.respuestas.length);
      });
  }

  mostrarPanelInferior(respuesta: Pregunta) {
    this.servicio.establecerRespuesta(respuesta);
    this.panelInferioir.open(RespuestasPanelInferiorComponent);
  }

  regresar() {
    this.location.back();
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
