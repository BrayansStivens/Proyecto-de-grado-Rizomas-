import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalEncuestaComponent } from '../../../../shared/components/modal-encuesta/modal-encuesta.component';

@Component({
  selector: 'rizo-menu-mapa',
  templateUrl: './menu-mapa.component.html',
  styleUrls: ['./menu-mapa.component.scss'],
})
export class MenuMapaComponent implements OnInit {
  @Output() ventana: EventEmitter<string> = new EventEmitter<string>();

  textBtnLogOut!: string;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openQuest();
    if (this.router.url.includes('invitados')) {
      this.textBtnLogOut = 'VOLVER';
    } else {
      this.textBtnLogOut = 'SALIR';
    }
  }

  openQuest(): void {
    this.dialog.open(ModalEncuestaComponent, {
      width: '630px',
      autoFocus: true,
    });
    setTimeout(() => {}, 600000);
  }

  tabChange(event: any) {
    this.ventana.emit(event.tab.textLabel);
  }
}
