import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MateriasService } from '../servicios/materias.service';
import { SeccionesService } from '../servicios/secciones.service';
import { PracticarService } from './practicar.service';

import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';

@Component({
  selector: 'app-practicar-seleccionar',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Practicar</p>
  </mat-toolbar>
  <!-- Card Lectura Materias-->
  <mat-tab-group (selectedIndexChange)="cambiarIndex($event)" color="accent" backgroundColor="primary" >
    <mat-tab *ngFor="let materia of materias; let j=index" label="{{materia.nombre}}">
      <div class="contenedor">
      <mat-card>
          <mat-table #table [dataSource]= "secciones[j]">
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
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let seccion; columns: displayedColumns;" (click) = practicar(seccion) ></mat-row>
          </mat-table>
        </mat-card>
      </div>
    </mat-tab>
  </mat-tab-group>

  `,
  styleUrls: ['./practicar.component.css'],

})
export class PracticarSeleccionarComponent implements OnInit, OnDestroy  {

  materias: Materia[] = [];
  secciones: Seccion[][] = [];

  suscripcionMaterias: any;
  suscripcionSecciones: any;

  displayedColumns = ['nombre'];

  indexMateria: number;

  constructor(
    private practicarService: PracticarService,
    private materiasService: MateriasService,
    private seccionesService: SeccionesService,
    private router: Router,
    private location: Location) {
      this.lectura();
  }

  ngOnInit() {
  }

  lectura() {
    this.suscripcionMaterias = this.materiasService.lectura()
      .subscribe((materias: Materia[]) => {
        this.materias = materias;
        for (let i = 0; i < materias.length; i++) {
          this.suscripcionSecciones = this.seccionesService.lectura(this.materias[i])
            .subscribe((secciones: Seccion[]) => {
              this.secciones[i] = secciones;
            });
        }
      });
  }

  cambiarIndex(indexMateria: number) {
    this.indexMateria = indexMateria;
  }

  practicar(seccion: Seccion) {
    this.practicarService.establecerMateria(this.materias[this.indexMateria]);
    this.practicarService.establecerSeccion(seccion);
    this.router.navigate(['seleccionar/practicar']);
  }

  regresar() {
    this.location.back();
  }

  ngOnDestroy() {
    this.suscripcionMaterias.unsubscribe();
    this.suscripcionSecciones.unsubscribe();
  }

}
