import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PreguntasService } from '../../servicios/preguntas.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';
import { Pregunta } from '../../modelos/pregunta';

import { MatTableDataSource, MatBottomSheet } from '@angular/material';

import { PreguntasPanelInferiorComponent } from './preguntas-panel-inferior.component';

@Component({
  selector: 'app-preguntas-lectura',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Preguntas</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card>
    <mat-card-title>{{materia.nombre}} / {{seccion.nombre}}</mat-card-title>
      <mat-table #table [dataSource]="dataSource">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let pregunta"> {{pregunta.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
          <mat-cell *matCellDef="let pregunta"> {{pregunta.nombre}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let pregunta; columns: displayedColumns;" (click) = mostrarPanelInferior(pregunta) ></mat-row>
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
export class PreguntasLecturaComponent implements OnInit, OnDestroy  {

  preguntas: Pregunta[] = [];
  displayedColumns = ['nombre'];
  dataSource: any;

  suscripcion: any;

  materia: Materia = {
    id: '',
    nombre: '',
  };

  seccion: Seccion = {
    id: '',
    nombre: '',
  };

  constructor(
    private preguntasService: PreguntasService,
    private panelInferioir: MatBottomSheet,
    private servicio: AdministrarDBRepasarService,
    private router: Router,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.lectura();
  }

  ngOnInit() {
  }

  alta() {
    this.router.navigate(['materias/secciones/preguntas/alta']);
  }

  lectura() {
    this.suscripcion = this.preguntasService.lectura(this.materia, this.seccion)
      .subscribe((preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
        this.dataSource = new MatTableDataSource(this.preguntas);
      });
  }

  mostrarPanelInferior(pregunta: Pregunta) {
    this.servicio.establecerPregunta(pregunta);
    this.panelInferioir.open(PreguntasPanelInferiorComponent);
  }

  regresar() {
    this.location.back();
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
