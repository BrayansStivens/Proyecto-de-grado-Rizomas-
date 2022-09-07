import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentidoComponent } from '../modal-contentido/modal-contentido.component';
import { PuntosService } from '../../../admin/services/puntos.service';

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
    private puntosService: PuntosService
  ) {}

  ngOnInit(): void {}

  getContenidos() {
    this.loader = true;
    this.puntosService.getPonit(1).subscribe(
      (response) => {
        this.loader = false;
        this.punto = response[0];
        this.contenidos = response[0].contenido;
        this.dialog.open(ModalContentidoComponent, {
          disableClose: true,
          autoFocus: false,
          data: {
            punto: this.punto,
            contenidos: this.contenidos,
          },
        });
      },
      () => (this.loader = false)
    );
  }
}
