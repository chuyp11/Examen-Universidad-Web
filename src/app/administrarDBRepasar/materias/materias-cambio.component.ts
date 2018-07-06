import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MateriasService } from '../../servicios/materias.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';

@Component({
  selector: 'app-materias-cambio',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Materias</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Editar Materia</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="formulario" class="formulario">
          <mat-form-field >
            <input matInput placeholder="Nombre" formControlName="nombre">
          </mat-form-field>
          <mat-form-field >
            <input matInput placeholder="Orden" formControlName="orden">
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button class="boton" (click)= cancelar()>Cancelar</button>
        <button mat-raised-button color="primary" (click)= confirmar()
          [disabled]="formulario.invalid">Actualizar</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class MateriasCambioComponent implements OnInit, OnDestroy {

  formulario: FormGroup;

  materia: Materia = {
    id: '',
    nombre: '',
    orden: 0,
  };
  materias: Materia[] = [];

  ordenAnterioir: number;
  ordenNuevo: number;

  suscripcion: any;

  constructor(
    private materiasService: MateriasService,
    private formBuilder: FormBuilder,
    private servicio: AdministrarDBRepasarService,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: [this.materia.nombre, Validators.required],
      orden: [this.materia.orden, Validators.required],
    });
  }

  confirmar() {
    this.ordenAnterioir = this.materia.orden;
    this.ordenNuevo = +this.formulario.value.orden;
    if (this.ordenAnterioir !== this.ordenNuevo) {
      if (this.ordenAnterioir > this.ordenNuevo) {
        const tam = this.ordenAnterioir - this.ordenNuevo;
        this.suscripcion = this.materiasService.lectura()
          .subscribe((materias: Materia[]) => {
            this.materias = materias;
            for (let i = 0; i < tam; i++) {
              this.materias[(this.ordenNuevo - 1)].orden += 1;
              this.materiasService.cambio(this.materias[(this.ordenNuevo - 1)]);
              this.ordenNuevo += 1;
              if (i === (tam - 1)) {
                this.suscripcion.unsubscribe();
                this.actualizarMateria();
              }
            }
          });
      } else if (this.ordenAnterioir < this.ordenNuevo) {
        const tam = this.ordenNuevo - this.ordenAnterioir;
        this.suscripcion = this.materiasService.lectura()
          .subscribe((materias: Materia[]) => {
            this.materias = materias;
            for (let i = 0; i < (tam); i++) {
              this.materias[(this.ordenNuevo - 1)].orden -= 1;
              this.materiasService.cambio(this.materias[(this.ordenNuevo - 1)]);
              this.ordenNuevo -= 1;
              if (i === (tam - 1)) {
                this.suscripcion.unsubscribe();
                this.actualizarMateria();
              }
            }
          });
      }
    } else {
      this.actualizarMateria();
    }
  }

  actualizarMateria() {
    this.materia.nombre = this.formulario.value.nombre;
    this.materia.orden = +this.formulario.value.orden;
    this.materiasService.cambio(this.materia);
    this.regresar();
  }

  cancelar() {
    this.regresar();
  }

  regresar() {
    this.location.back();
  }

  ngOnDestroy() {
    // this.suscripcion.unsubscribe();
  }

}
