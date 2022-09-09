import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rizo-menu-docentes',
  templateUrl: './menu-docentes.component.html',
  styleUrls: ['./menu-docentes.component.scss'],
})
export class MenuDocentesComponent implements OnInit {
  @Output() ventana: EventEmitter<string> = new EventEmitter<string>();

  textBtnLogOut!: string;

  constructor() {}

  ngOnInit(): void {}

  tabChange(event: any) {
    this.ventana.emit(event.tab.textLabel);
  }
}
