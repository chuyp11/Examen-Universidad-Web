import { Component, OnInit } from '@angular/core';
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
export class MateriasCambioComponent implements OnInit {

  formulario: FormGroup;
  materia: Materia = {
    id: '',
    nombre: '',
  };

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
      nombre: [this.materia.nombre, Validators.required]
    });
  }

  confirmar() {
    this.materia.nombre = this.formulario.value.nombre;
    this.materiasService.cambio(this.materia);
    this.regresar();
  }

  cancelar() {
    this.regresar();
  }

  regresar() {
    this.location.back();
  }

}
