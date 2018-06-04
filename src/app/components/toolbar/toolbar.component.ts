import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() abrirMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickMenu() {
    this.abrirMenu.emit();
  }

}
