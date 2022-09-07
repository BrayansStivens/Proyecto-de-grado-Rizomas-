import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rizo-menu-mapa',
  templateUrl: './menu-mapa.component.html',
  styleUrls: ['./menu-mapa.component.scss'],
})
export class MenuMapaComponent implements OnInit {
  @Output() ventana: EventEmitter<string> = new EventEmitter<string>();

  textBtnLogOut!: string;

  constructor() {}

  ngOnInit(): void {}

  tabChange(event: any) {
    this.ventana.emit(event.tab.textLabel);
  }
}
