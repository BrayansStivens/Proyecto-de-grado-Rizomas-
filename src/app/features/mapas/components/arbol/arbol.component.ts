import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentidoComponent } from '../modal-contentido/modal-contentido.component';
import { PuntosService } from '../../../admin/services/puntos.service';
import { ContenidosService } from '../../services/contenidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rizo-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.scss'],
})
export class ArbolComponent implements OnInit {
  loader!: boolean;
  punto!: any;
  contenidos!: Array<any>;
  invitado!: boolean;

  constructor(
    private dialog: MatDialog,
    private puntosService: PuntosService,
    private contenidosService: ContenidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invitado = this.router.url.includes('invitados');
  }

  getContenidos(id: string) {
    this.loader = true;
    this.contenidosService.getContentsByPoint(id).subscribe(
      (responseContenido) => {
        this.puntosService.getPoint(id).subscribe(
          (responsePunto) => {
            this.loader = false;
            this.punto = responsePunto;
            this.contenidos = [];
            responseContenido.forEach((element: any) => {
              if (this.invitado) {
                if (
                  element.esPrivado === 'publico' &&
                  element.estado !== 'no_activo'
                ) {
                  this.contenidos.push(element);
                }
              } else {
                if (
                  element.esPrivado === 'privado' &&
                  element.estado !== 'no_activo'
                ) {
                  this.contenidos.push(element);
                }
              }
            });
            this.dialog.open(ModalContentidoComponent, {
              disableClose: true,
              autoFocus: 'h2',
              data: {
                punto: this.punto,
                contenidos: this.contenidos,
              },
            });
          },
          () => (this.loader = false)
        );
      },
      () => (this.loader = false)
    );
  }
}
