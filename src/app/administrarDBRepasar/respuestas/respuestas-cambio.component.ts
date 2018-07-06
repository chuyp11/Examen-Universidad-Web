import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RespuestasService } from '../../servicios/respuestas.service';
import { AdministrarDBRepasarService } from '../administrar-db-repasar.service';

import { Materia } from '../../modelos/materia';
import { Seccion } from '../../modelos/seccion';
import { Pregunta } from '../../modelos/pregunta';
import { Respuesta } from '../../modelos/respuesta';

@Component({
  selector: 'app-respuestas-cambio',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Respuesta</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Editar Respuesta</mat-card-title>
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
export class RespuestasCambioComponent implements OnInit {

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
  respuesta: Respuesta = {
    id: '',
    nombre: '',
    orden: 0,
  };
  respuestas: Respuesta[];

  ordenAnterioir: number;
  ordenNuevo: number;

  suscripcion: any;

  constructor(
    private respuestasService: RespuestasService,
    private formBuilder: FormBuilder,
    private servicio: AdministrarDBRepasarService,
    private location: Location ) {
      this.materia = this.servicio.obtenerMateria();
      this.seccion = this.servicio.obtenerSeccion();
      this.pregunta = this.servicio.obtenerPregunta();
      this.respuesta = this.servicio.obtenerRespuesta();
      this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: [this.respuesta.nombre, Validators.required],
      orden: [this.respuesta.orden, Validators.required],
    });
  }

  confirmar() {
    this.ordenAnterioir = this.respuesta.orden;
    this.ordenNuevo = +this.formulario.value.orden;
    if (this.ordenAnterioir !== this.ordenNuevo) {
      if (this.ordenAnterioir > this.ordenNuevo) {
        const tam = this.ordenAnterioir - this.ordenNuevo;
        this.suscripcion = this.respuestasService.lectura(this.materia, this.seccion, this.pregunta)
          .subscribe((respuestas: Respuesta[]) => {
            this.respuestas = respuestas;
            for (let i = 0; i < tam; i++) {
              this.respuestas[(this.ordenNuevo - 1)].orden += 1;
              this.respuestasService.cambio(this.materia, this.seccion, this.pregunta, this.respuestas[(this.ordenNuevo - 1)]);
              this.ordenNuevo += 1;
              if (i === (tam - 1)) {
                this.suscripcion.unsubscribe();
                this.actualizarMateria();
              }
            }
          });
      } else if (this.ordenAnterioir < this.ordenNuevo) {
        const tam = this.ordenNuevo - this.ordenAnterioir;
        this.suscripcion = this.respuestasService.lectura(this.materia, this.seccion, this.pregunta)
          .subscribe((respuestas: Respuesta[]) => {
            this.respuestas = respuestas;
            for (let i = 0; i < (tam); i++) {
              this.respuestas[(this.ordenNuevo - 1)].orden -= 1;
              this.respuestasService.cambio(this.materia, this.seccion, this.pregunta, this.respuestas[(this.ordenNuevo - 1)]);
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
    this.respuesta.nombre = this.formulario.value.nombre;
    this.respuesta.orden = +this.formulario.value.orden;
    this.respuestasService.cambio(this.materia, this.seccion, this.pregunta, this.respuesta);
    this.regresar();
  }

  cancelar() {
    this.regresar();
  }

  regresar() {
    this.location.back();
  }

}
