import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Angular Animations
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
// import { FlexLayoutModule } from '@angular/flex-layout';


import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './componentes/toolbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

import { AdministrarDBRepasarModule } from './administrarDBRepasar/administrar-db-repasar.module';
import { PracticarModule } from './practicar/practicar.module';

import { AppRoutingModule } from './app-routing.module';
import { PruebasComponent } from './componentes/pruebas/pruebas.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    InicioComponent,
    PruebasComponent,
  ],
  imports: [
    BrowserModule,
    PracticarModule,
    AdministrarDBRepasarModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
