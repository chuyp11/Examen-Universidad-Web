import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SeccionesService } from '../../servicios/secciones.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';

import { MatTableDataSource, MatBottomSheet } from '@angular/material';

import { SeccionesPanelInferiorComponent } from './secciones-panel-inferior.component';

@Component({
  selector: 'app-secciones-lectura',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Secciones</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card >
    <mat-card-title>{{materia.nombre}}</mat-card-title>
      <mat-table #table [dataSource]="dataSource">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let seccion"> {{seccion.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
          <mat-cell *matCellDef="let seccion"> {{seccion.nombre}} </mat-cell>
        </ng-container>
        <ng-container matColumnDef="orden">
          <mat-header-cell *matHeaderCellDef> Orden </mat-header-cell>
          <mat-cell *matCellDef="let seccion"> {{seccion.orden}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let seccion; columns: displayedColumns;" (click) = mostrarPanelInferior(seccion) ></mat-row>
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
export class SeccionesLecturaComponent implements OnInit, OnDestroy  {

  secciones: Seccion[] = [];
  displayedColumns = ['nombre', 'orden'];
  dataSource: any;

  suscripcion: any;

  materia: Materia = {
    id: '',
    nombre: '',
    orden: 0,
  };

  constructor(
    private seccionesService: SeccionesService,
    private panelInferioir: MatBottomSheet,
    private servicio: AdministrarDBRepasarService,
    private router: Router,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.lectura();
  }

  ngOnInit() {
  }

  alta() {
    this.router.navigate(['materias/secciones/alta']);
  }

  lectura() {
    this.suscripcion = this.seccionesService.lectura(this.materia)
      .subscribe((secciones: Seccion[]) => {
        this.secciones = secciones;
        this.dataSource = new MatTableDataSource(this.secciones);
        this.servicio.establecerCantidadSecciones(this.secciones.length);
      });
  }

  mostrarPanelInferior(seccion: Seccion) {
    this.servicio.establecerSeccion(seccion);
    this.panelInferioir.open(SeccionesPanelInferiorComponent);
  }

  regresar() {
    this.location.back();
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
