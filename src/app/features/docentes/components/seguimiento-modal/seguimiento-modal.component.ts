import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from '../../../admin/services/alumnos.service';
import { SeguimientoService } from '../../../mapas/services/seguimiento.service';
import { PuntosService } from '../../../admin/services/puntos.service';
import {
  CellType,
  Action,
} from '../../../../shared/components/table/interface/table';
import {
  PaginationType,
  SelectionStrategy,
} from 'src/app/shared/components/table/interface/table';

@Component({
  selector: 'rizo-seguimiento-modal',
  templateUrl: './seguimiento-modal.component.html',
  styleUrls: ['./seguimiento-modal.component.scss'],
})
export class SeguimientoModalComponent implements OnInit {
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.SERVER_SIDE;
  selectStrategy = SelectionStrategy.NONE;

  puntos!: Array<any>;
  puntosVistos: number = 0;
  porcentajeVisto!: number | string;

  columnHeader = {
    nombre: { label: 'Punto' },
    archivo: { label: 'Imagen', type: CellType.IMAGES },
    visto: { label: 'Visto' },
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      estudiante: any;
    },
    private alumnosService: AlumnosService,
    private puntosService: PuntosService,
    private seguimientoService: SeguimientoService
  ) {}

  ngOnInit(): void {
    this.getPuntos();
  }

  getPuntos(): void {
    this.puntosService.getAllPonits().subscribe((response: any) => {
      this.puntos = response;
      this.puntos.forEach((punto: any) => {
        punto.visto = 'No';
      });
      this.getPuntosByPupil();
    });
  }

  getPuntosByPupil(): void {
    this.seguimientoService
      .getSeguimientoByPupil(this.data.estudiante.id)
      .subscribe((response: Array<any>) => {
        this.puntos.forEach((punto: any) => {
          response.forEach((visto: any) => {
            if (punto.id === visto.punto.id) {
              punto.visto = 'Si';
              this.puntosVistos = this.puntosVistos + 1;
            }
          });
        });
        this.dataSourse.data = this.puntos;
        this.dataSourse.data.forEach((element: any) => {
          element.archivo = {
            url: element.archivo,
          };
        });
        this.porcentajeVisto = (this.puntosVistos * 100) / this.puntos.length;
        this.porcentajeVisto = this.porcentajeVisto.toString().slice(0, 5);
      });
  }
}
