import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';

const appRoutes: Routes = [
  { path: 'inicio',        component: InicioComponent },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
