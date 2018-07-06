import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { PracticarService } from './practicar.service';
import { PreguntasService } from '../servicios/preguntas.service';
import { RespuestasService } from '../servicios/respuestas.service';

import { Materia } from '../modelos/materia';
import { Seccion } from '../modelos/seccion';
import { Pregunta } from '../modelos/pregunta';
import { Respuesta } from '../modelos/respuesta';

@Component({
  selector: 'app-practicar',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Practicar</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card *ngIf="mostrar">
      <mat-card-content>
        <p>{{preguntas[0].nombre}}</p>
        <p>{{respuestas[0][0].nombre}}</p>
        <p>{{respuestas[0][1].nombre}}</p>
        <p>{{respuestas[0][2].nombre}}</p>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styleUrls: ['./practicar.component.css'],
})
export class PracticarComponent implements OnInit {

  preguntas: Pregunta[] = [];
  respuestas: Respuesta[][] = [];

  materia: Materia = {
    id: '',
    nombre: '',
    orden: 0,
  };
  seccion: Seccion = {
    id: '',
    nombre: '',
  };

  suscripcionPreguntas: any;
  suscripcionRespuestas: any;

  mostrar: boolean;

  constructor(
    private preguntasServices: PreguntasService,
    private respuestasService: RespuestasService,
    private practicarService: PracticarService,
    private location: Location) {
      this.materia = this.practicarService.obtenerMateria();
      this.seccion = this.practicarService.obtenerSeccion();
      this.lectura();
  }

  ngOnInit() {
    this.mostrar = false;
  }

  lectura() {
    this.suscripcionPreguntas = this.preguntasServices.lectura(this.materia, this.seccion)
      .subscribe((preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
        for (let i = 0; i < preguntas.length; i++) {
          this.suscripcionRespuestas = this.respuestasService.lectura(this.materia, this.seccion, this.preguntas[i])
            .subscribe((respuestas: Respuesta[]) => {
              this.respuestas[i] = respuestas;
              if (i === (preguntas.length - 1)) {
                this.mostrar = true;
              }
            });
        }
      });
  }



  regresar() {
    this.location.back();
  }

}
