import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentidoComponent } from '../modal-contentido/modal-contentido.component';
import { PuntosService } from '../../../admin/services/puntos.service';
import { ContenidosService } from '../../services/contenidos.service';

@Component({
  selector: 'rizo-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.scss'],
})
export class ArbolComponent implements OnInit {
  loader!: boolean;
  punto!: any;
  contenidos!: Array<any>;

  constructor(
    private dialog: MatDialog,
    private puntosService: PuntosService,
    private contenidosService: ContenidosService
  ) {}

  ngOnInit(): void {}

  getContenidos(id: string) {
    this.loader = true;
    this.contenidosService.getContentsByPoint(id).subscribe(
      (responseContenido) => {
        this.puntosService.getPoint(id).subscribe(
          (responsePunto) => {
            this.loader = false;
            this.punto = responsePunto;
            this.contenidos = responseContenido;
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
