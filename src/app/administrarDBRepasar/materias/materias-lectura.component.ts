import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MateriasService } from '../../servicios/materias.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';

import { MatTableDataSource, MatBottomSheet } from '@angular/material';

import { MateriasPanelInferiorComponent } from './materias-panel-inferior.component';


@Component({
  selector: 'app-materias-lectura',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Materias</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card >
      <mat-table #table [dataSource]="dataSource">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let materia"> {{materia.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
          <mat-cell *matCellDef="let materia"> {{materia.nombre}} </mat-cell>
        </ng-container>
        <ng-container matColumnDef="orden">
          <mat-header-cell *matHeaderCellDef> Orden </mat-header-cell>
          <mat-cell *matCellDef="let materia"> {{materia.orden}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let materia; columns: displayedColumns;" (click) = mostrarPanelInferior(materia) ></mat-row>
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
export class MateriasLecturaComponent implements OnInit, OnDestroy  {

  materias: Materia[] = [];
  displayedColumns = ['nombre', 'orden'];
  dataSource: any;

  suscripcion: any;

  constructor(
    private materiasService: MateriasService,
    private panelInferioir: MatBottomSheet,
    private servicio: AdministrarDBRepasarService,
    private router: Router,
    private location: Location) {
      this.lectura();
  }

  ngOnInit() {
  }

  alta() {
    this.router.navigate(['materias/alta']);
  }

  lectura() {
    this.suscripcion = this.materiasService.lectura()
      .subscribe((materias: Materia[]) => {
        this.materias = materias;
        this.dataSource = new MatTableDataSource<Materia>(this.materias);
        this.servicio.establecerCantidadMaterias(this.materias.length);
      });
  }

  mostrarPanelInferior(materia: Materia) {
    this.servicio.establecerMateria(materia);
    this.panelInferioir.open(MateriasPanelInferiorComponent);
  }

  regresar() {
    this.location.back();
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
