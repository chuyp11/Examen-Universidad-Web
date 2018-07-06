import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SeccionesService } from '../../servicios/secciones.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';

@Component({
  selector: 'app-secciones-cambio',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Secciones</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Editar Seccion</mat-card-title>
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
export class SeccionesCambioComponent implements OnInit {

  formulario: FormGroup;
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
  secciones: Seccion[] = [];

  ordenAnterioir: number;
  ordenNuevo: number;

  suscripcion: any;

  constructor(
    private seccionesService: SeccionesService,
    private formBuilder: FormBuilder,
    private servicio: AdministrarDBRepasarService,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: [this.seccion.nombre, Validators.required],
      orden: [this.seccion.orden, Validators.required],
    });
  }

  confirmar() {
    this.ordenAnterioir = this.seccion.orden;
    this.ordenNuevo = +this.formulario.value.orden;
    if (this.ordenAnterioir !== this.ordenNuevo) {
      if (this.ordenAnterioir > this.ordenNuevo) {
        console.log('If 1');
        const tam = this.ordenAnterioir - this.ordenNuevo;
        this.suscripcion = this.seccionesService.lectura(this.materia)
          .subscribe((secciones: Seccion[]) => {
            this.secciones = secciones;
            for (let i = 0; i < tam; i++) {
              console.log('for 1');
              this.secciones[(this.ordenNuevo - 1)].orden += 1;
              this.seccionesService.cambio(this.materia, this.secciones[(this.ordenNuevo - 1)]);
              this.ordenNuevo += 1;
              if (i === (tam - 1)) {
                this.suscripcion.unsubscribe();
                this.actualizarMateria();
              }
            }
          });
      } else if (this.ordenAnterioir < this.ordenNuevo) {
        console.log('If 2');
        const tam = this.ordenNuevo - this.ordenAnterioir;
        this.suscripcion = this.seccionesService.lectura(this.materia)
          .subscribe((secciones: Seccion[]) => {
            this.secciones = secciones;
            for (let i = 0; i < (tam); i++) {
              console.log('for2');
              this.secciones[(this.ordenNuevo - 1)].orden -= 1;
              this.seccionesService.cambio(this.materia, this.secciones[(this.ordenNuevo - 1)]);
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
    this.seccion.nombre = this.formulario.value.nombre;
    this.seccion.orden = +this.formulario.value.orden;
    this.seccionesService.cambio(this.materia, this.seccion);
    this.regresar();
  }

  cancelar() {
    this.regresar();
  }

  regresar() {
    this.location.back();
  }

}
