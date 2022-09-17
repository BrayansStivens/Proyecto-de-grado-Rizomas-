import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PuntosService } from 'src/app/features/admin/services/puntos.service';
import { ContenidosService } from '../../services/contenidos.service';
import { ModalContentidoComponent } from '../modal-contentido/modal-contentido.component';

@Component({
  selector: 'rizo-mujeres',
  templateUrl: './mujeres.component.html',
  styleUrls: ['./mujeres.component.scss'],
})
export class MujeresComponent implements OnInit {
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
        this.puntosService.getPonit(id).subscribe(
          (responsePunto) => {
            this.loader = false;
            this.punto = responsePunto[0];
            this.contenidos = responseContenido;
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
      },
      () => (this.loader = false)
    );
  }
}
