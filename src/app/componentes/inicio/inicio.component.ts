import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  estudiar() {
    this.router.navigate(['materias']);
  }

  practicar() {
    this.router.navigate(['seleccionarPracticar']);
  }

  pruebas() {
    this.router.navigate(['pruebas']);
  }

}
