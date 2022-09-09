import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  PaginationType,
  SelectionStrategy,
  CellType,
} from 'src/app/shared/components/table/interface/table';

@Component({
  selector: 'rizo-administrador-alumnos',
  templateUrl: './administrador-alumnos.component.html',
  styleUrls: ['./administrador-alumnos.component.scss'],
})
export class AdministradorAlumnosComponent implements OnInit {
  loader!: boolean;
  dataSourse = new MatTableDataSource<any>();
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE;

  columnHeader = {
    nombre: { label: 'Nombre' },
    semestre: { label: 'Semestre' },
    asignatura: { label: 'Asignatura' },
    profesor: { label: 'Docente' },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };
  constructor() {}

  ngOnInit(): void {}

  actionEvent(event: any): void {}
}
