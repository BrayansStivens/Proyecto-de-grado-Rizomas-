import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  paginationType = PaginationType.NONE;
  selectStrategy = SelectionStrategy.NONE;

  estudiante!: any;

  columnHeader = {
    mapa: { label: 'Mapa' },
    porcentaje: { label: '% Visto' },
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      estudiante: any;
    }
  ) {}

  ngOnInit(): void {
    this.fillTable();
  }

  fillTable(): void {
    this.dataSourse.data = [
      { mapa: 'Árbol', porcentaje: '30%' },
      { mapa: 'Mujeres', porcentaje: '80%' },
    ];
  }
}
