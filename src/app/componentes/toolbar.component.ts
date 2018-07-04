import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppBarSuperiorService } from '../servicios/app-bar-superior.service';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar class="toolbar" color="primary">
      <i class="material-icons"
        (click)="clickRegresar()">menu
      </i>
      <span class="titulo">{{titulo}}</span>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() abrirMenu = new EventEmitter();
  titulo = '';

  constructor(private appBarSuperiorService: AppBarSuperiorService ) {
    this.appBarSuperiorService.obtenerTitulo().subscribe( titulo => this.titulo = titulo);
  }

  ngOnInit() {
  }

  clickMenu() {
    this.abrirMenu.emit();
  }

  clickRegresar() {
  }

}
