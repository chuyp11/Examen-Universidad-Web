import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MateriasAltaComponent } from './materias/materias-alta.component';
import { MateriasBajaComponent } from './materias/materias-baja.component';
import { MateriasCambioComponent } from './materias/materias-cambio.component';
import { MateriasLecturaComponent } from './materias/materias-lectura.component';
import { MateriasPanelInferiorComponent } from './materias/materias-panel-inferior.component';

import { SeccionesAltaComponent } from './secciones/secciones-alta.component';
import { SeccionesBajaComponent } from './secciones/secciones-baja.component';
import { SeccionesCambioComponent } from './secciones/secciones-cambio.component';
import { SeccionesLecturaComponent } from './secciones/secciones-lectura.component';
import { SeccionesPanelInferiorComponent } from './secciones/secciones-panel-inferior.component';

import { PreguntasAltaComponent } from './preguntas/preguntas-alta.component';
import { PreguntasBajaComponent } from './preguntas/preguntas-baja.component';
import { PreguntasCambioComponent } from './preguntas/preguntas-cambio.component';
import { PreguntasLecturaComponent } from './preguntas/preguntas-lectura.component';
import { PreguntasPanelInferiorComponent } from './preguntas/preguntas-panel-inferior.component';

import { RespuestasAltaComponent } from './respuestas/respuestas-alta.component';
import { RespuestasBajaComponent } from './respuestas/respuestas-baja.component';
import { RespuestasCambioComponent } from './respuestas/respuestas-cambio.component';
import { RespuestasLecturaComponent } from './respuestas/respuestas-lectura.component';
import { RespuestasPanelInferiorComponent } from './respuestas/respuestas-panel-inferior.component';

import { AdministrarDBRepasarRoutingModule } from './administrar-db-repasar-routing.module';

import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    AdministrarDBRepasarRoutingModule,
  ],
  declarations: [
    MateriasAltaComponent,
    MateriasBajaComponent,
    MateriasCambioComponent,
    MateriasLecturaComponent,
    MateriasPanelInferiorComponent,
    SeccionesAltaComponent,
    SeccionesBajaComponent,
    SeccionesCambioComponent,
    SeccionesLecturaComponent,
    SeccionesPanelInferiorComponent,
    PreguntasAltaComponent,
    PreguntasBajaComponent,
    PreguntasCambioComponent,
    PreguntasLecturaComponent,
    PreguntasPanelInferiorComponent,
    RespuestasAltaComponent,
    RespuestasBajaComponent,
    RespuestasCambioComponent,
    RespuestasLecturaComponent,
    RespuestasPanelInferiorComponent,
  ],
  entryComponents: [
    MateriasBajaComponent,
    MateriasPanelInferiorComponent,
    SeccionesBajaComponent,
    SeccionesPanelInferiorComponent,
    PreguntasBajaComponent,
    PreguntasPanelInferiorComponent,
    RespuestasBajaComponent,
    RespuestasPanelInferiorComponent,
  ],
})
export class AdministrarDBRepasarModule {}
