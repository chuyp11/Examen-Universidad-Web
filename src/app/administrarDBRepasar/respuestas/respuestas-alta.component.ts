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
  selector: 'app-respuestas-alta',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Alta Respuesta</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Agregar Respuesta</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="formulario" class="formulario">
          <mat-form-field >
            <input matInput placeholder="Nombre" formControlName="nombre">
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button class="boton" (click)= cancelar()>Cancelar</button>
        <button mat-raised-button color="primary" (click)= confirmar()
          [disabled]="formulario.invalid">Agregar</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styleUrls: ['../administrar-db-repasar.component.css'],
})
export class RespuestasAltaComponent implements OnInit {

  formulario: FormGroup;
  materia: Materia = {
    id: '',
    nombre: '',
  };
  seccion: Seccion = {
    id: '',
    nombre: '',
  };
  pregunta: Pregunta = {
    id: '',
    nombre: '',
  };
  respuesta: Respuesta = {
    id: '',
    nombre: '',
  };

  constructor(
    private respuestasService: RespuestasService,
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
      nombre: ['', Validators.required],
    });
  }

  confirmar() {
    this.respuesta.nombre = this.formulario.value.nombre;
    this.respuestasService.alta(this.materia, this.seccion, this.pregunta, this.respuesta);
    this.regresar();
  }

  cancelar() {
    this.regresar();
  }

  regresar() {
    this.location.back();
  }

}
