import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MateriasAltaComponent } from './materias/materias-alta.component';
import { MateriasCambioComponent } from './materias/materias-cambio.component';
import { MateriasLecturaComponent } from './materias/materias-lectura.component';

import { SeccionesAltaComponent } from './secciones/secciones-alta.component';
import { SeccionesCambioComponent } from './secciones/secciones-cambio.component';
import { SeccionesLecturaComponent } from './secciones/secciones-lectura.component';

import { PreguntasAltaComponent } from './preguntas/preguntas-alta.component';
import { PreguntasCambioComponent } from './preguntas/preguntas-cambio.component';
import { PreguntasLecturaComponent } from './preguntas/preguntas-lectura.component';

import { RespuestasAltaComponent } from './respuestas/respuestas-alta.component';
import { RespuestasCambioComponent } from './respuestas/respuestas-cambio.component';
import { RespuestasLecturaComponent } from './respuestas/respuestas-lectura.component';

const administrarDBRepasarRoutes: Routes = [
  { path: 'materias', component: MateriasLecturaComponent },
  { path: 'materias/alta', component: MateriasAltaComponent },
  { path: 'materias/cambio', component: MateriasCambioComponent },
  { path: 'materias/secciones', component: SeccionesLecturaComponent },
  { path: 'materias/secciones/alta', component: SeccionesAltaComponent },
  { path: 'materias/secciones/cambio', component: SeccionesCambioComponent },
  { path: 'materias/secciones/preguntas', component: PreguntasLecturaComponent },
  { path: 'materias/secciones/preguntas/alta', component: PreguntasAltaComponent },
  { path: 'materias/secciones/preguntas/cambio', component: PreguntasCambioComponent },
  { path: 'materias/secciones/preguntas/respuestas', component: RespuestasLecturaComponent },
  { path: 'materias/secciones/preguntas/respuestas/alta', component: RespuestasAltaComponent },
  { path: 'materias/secciones/preguntas/respuestas/cambio', component: RespuestasCambioComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(administrarDBRepasarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministrarDBRepasarRoutingModule {}
