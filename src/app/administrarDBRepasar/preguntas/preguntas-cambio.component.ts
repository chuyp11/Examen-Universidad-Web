import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PreguntasService } from '../../servicios/preguntas.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';
import { Pregunta } from '../../modelos/pregunta';

@Component({
  selector: 'app-preguntas-cambio',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Preguntas</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Editar Pregunta</mat-card-title>
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
export class PreguntasCambioComponent implements OnInit {

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
  pregunta: Pregunta = {
    id: '',
    nombre: '',
    orden: 0,
  };
  preguntas: Pregunta[] = [];

  ordenAnterioir: number;
  ordenNuevo: number;

  suscripcion: any;

  constructor(
    private pregutasService: PreguntasService,
    private formBuilder: FormBuilder,
    private servicio: AdministrarDBRepasarService,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.pregunta = this.servicio.obtenerPregunta();
      this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: [this.pregunta.nombre, Validators.required],
      orden: [this.pregunta.orden, Validators.required],
    });
  }

  confirmar() {
    this.ordenAnterioir = this.pregunta.orden;
    this.ordenNuevo = +this.formulario.value.orden;
    if (this.ordenAnterioir !== this.ordenNuevo) {
      if (this.ordenAnterioir > this.ordenNuevo) {
        const tam = this.ordenAnterioir - this.ordenNuevo;
        this.suscripcion = this.pregutasService.lectura(this.materia, this.seccion)
          .subscribe((preguntas: Pregunta[]) => {
            this.preguntas = preguntas;
            for (let i = 0; i < tam; i++) {
              this.preguntas[(this.ordenNuevo - 1)].orden += 1;
              this.pregutasService.cambio(this.materia, this.seccion, this.preguntas[(this.ordenNuevo - 1)]);
              this.ordenNuevo += 1;
              if (i === (tam - 1)) {
                this.suscripcion.unsubscribe();
                this.actualizarMateria();
              }
            }
          });
      } else if (this.ordenAnterioir < this.ordenNuevo) {
        const tam = this.ordenNuevo - this.ordenAnterioir;
        this.suscripcion = this.pregutasService.lectura(this.materia, this.seccion)
          .subscribe((preguntas: Pregunta[]) => {
            this.preguntas = preguntas;
            for (let i = 0; i < (tam); i++) {
              this.preguntas[(this.ordenNuevo - 1)].orden -= 1;
              this.pregutasService.cambio(this.materia, this.seccion,  this.preguntas[(this.ordenNuevo - 1)]);
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
    this.pregunta.nombre = this.formulario.value.nombre;
    this.pregunta.orden = +this.formulario.value.orden;
    this.pregutasService.cambio(this.materia, this.seccion, this.pregunta);
    this.regresar();
  }

  cancelar() {
    this.regresar();
  }

  regresar() {
    this.location.back();
  }

}
