import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticarSeleccionarComponent } from './practicarSeleccionar.component';
import { PracticarComponent } from './practicar.component';

const practicarRoutes: Routes = [
  { path: 'seleccionarPracticar', component: PracticarSeleccionarComponent },
  { path: 'seleccionar/practicar', component: PracticarComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(practicarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PracticarRoutingModule {}
