import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticarSeleccionarComponent } from './practicarSeleccionar.component';
import { PracticarComponent } from './practicar.component';

import { PracticarRoutingModule } from './practicar-routing.module';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    PracticarRoutingModule
  ],
  declarations: [
    PracticarSeleccionarComponent,
    PracticarComponent,
  ],
  entryComponents: [
  ],
})
export class PracticarModule {}
