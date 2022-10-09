import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GruposService } from 'src/app/features/admin/services/grupos.service';
import { AlumnosService } from '../../../admin/services/alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { SeguimientoModalComponent } from '../seguimiento-modal/seguimiento-modal.component';
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

  grupos!: Array<any>;

  columnHeader = {
    correo: { label: 'Correo' },
    nombre: { label: 'Nombre' },
    documento: { label: 'Documento' },
    semestre: { label: 'Semestre' },
    asignatura: { label: 'Asignatura' },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };
  constructor(
    private gruposService: GruposService,
    private alumnosService: AlumnosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllGroups();
    this.fillTable();
  }

  getAllGroups(): void {
    this.gruposService.getAllGroups().subscribe((response: any) => {
      this.grupos = response;
    });
  }

  fillTable(): void {
    this.dataSourse.data = [
      {
        correo: 'Estudiante@example.com',
        nombre: 'Estudiante Primer Apellido Segundo Apellido',
        documento: '105515045',
        semestre: '2022-2',
        asignatura: 'CTS',
        action: [{ name: 'remove_red_eye' }],
      },
    ];
  }

  openSeguimiento(data: any): void {
    this.dialog.open(SeguimientoModalComponent, {
      disableClose: true,
      width: '55vw',
      data: { estudiante: data },
    });
  }

  actionEvent(event: any): void {
    console.log(event);
    this.openSeguimiento(event.row);
  }
}
