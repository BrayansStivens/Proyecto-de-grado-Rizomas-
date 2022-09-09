import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rizo-menu-mapa',
  templateUrl: './menu-mapa.component.html',
  styleUrls: ['./menu-mapa.component.scss'],
})
export class MenuMapaComponent implements OnInit {
  @Output() ventana: EventEmitter<string> = new EventEmitter<string>();

  textBtnLogOut!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('invitados')) {
      this.textBtnLogOut = 'VOLVER';
    } else {
      this.textBtnLogOut = 'SALIR';
    }
  }

  tabChange(event: any) {
    this.ventana.emit(event.tab.textLabel);
  }
}
